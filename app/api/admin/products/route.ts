import { NextRequest, NextResponse } from "next/server"
import { readFileSync, writeFileSync, existsSync } from "fs"
import { join } from "path"

const DATA_FILE = join(process.cwd(), "data", "products.json")

function getProducts() {
  if (!existsSync(DATA_FILE)) {
    // Bootstrap from lib/products.ts on first run
    return []
  }
  const raw = readFileSync(DATA_FILE, "utf-8")
  return JSON.parse(raw)
}

function saveProducts(products: unknown[]) {
  const dir = join(process.cwd(), "data")
  if (!existsSync(dir)) {
    const { mkdirSync } = require("fs")
    mkdirSync(dir, { recursive: true })
  }
  writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8")
}

export async function GET() {
  const products = getProducts()
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const products = getProducts()
  const newProduct = { ...body, id: Date.now().toString(), createdAt: new Date().toISOString() }
  products.push(newProduct)
  saveProducts(products)
  return NextResponse.json(newProduct, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const products = getProducts()
  const idx = products.findIndex((p: { id: string }) => p.id === body.id)
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 })
  products[idx] = { ...products[idx], ...body, updatedAt: new Date().toISOString() }
  saveProducts(products)
  return NextResponse.json(products[idx])
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  let products = getProducts()
  products = products.filter((p: { id: string }) => p.id !== id)
  saveProducts(products)
  return NextResponse.json({ success: true })
}
