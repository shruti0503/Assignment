'use client'

import { useEffect, useRef, useState } from "react"
import { data } from "./data"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"


type Product = {
  id: string
  title: string
  price: number
  rating: number
  image: string
  description: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [searching, setSearching] = useState(false)
  const [search, setSearch] = useState("")
  const cacheRef = useRef<Product[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [selected, setSelected] = useState<Product | null>(null)

  // fetch
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      try {
        if (cacheRef.current) {
          setProducts(cacheRef.current)
          setFiltered(cacheRef.current)
        } else {
          cacheRef.current = data
          setProducts(data)
          setFiltered(data)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [])


    useEffect(() => {
        if (!search.trim()) {
          setFiltered(products)
          return
        }

        setSearching(true)
        const id = setTimeout(() => {
          const results = products.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase())
          )
          setFiltered(results)
          setSearching(false)
        }, 300)

        return () => clearTimeout(id)
    }, [search, products])

  if (loading) return <p className="p-4">Loading products...</p>
  if (error)
    return (
      <div className="p-4">
        <p>Error fetching products.</p>
        <button className="underline" onClick={() => setProducts(data)}>
          Retry
        </button>
      </div>
    )

  return (
    <div className="p-4">
      <label className="block mb-2 font-medium">
        Search:
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-2 py-1 ml-2"
        />
      </label>

      {
        searching ? <p className="text-sm text-gray-500 mt-1">Searching...</p>:
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {filtered.map(p => (
            <Dialog key={p.id} onOpenChange={open => !open && setSelected(null)}>
              <DialogTrigger asChild>
                <div
                  onClick={() => setSelected(p)}
                  className="border rounded p-2 cursor-pointer focus:ring-2 focus:ring-offset-2"
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && setSelected(p)}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="font-semibold mt-2">{p.title}</h3>
                  <p>₹{p.price}</p>
                  <p>Rating: {p.rating}/5</p>
                </div>
              </DialogTrigger>

              {selected?.id === p.id && (
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{selected.title}</DialogTitle>
                    <DialogDescription>{selected.description}</DialogDescription>
                  </DialogHeader>
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-64 object-cover rounded"
                  />
                  <p className="font-semibold mt-2">₹{selected.price}</p>
                  <p>Rating: {selected.rating}/5</p>
                </DialogContent>
              )}
            </Dialog>
          ))}
        </div>

      }

      
    </div>
  )
}
