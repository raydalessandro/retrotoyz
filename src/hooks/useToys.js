import { useState, useEffect, useCallback } from 'react'
import { SEED_TOYS } from '../lib/constants'

const STORAGE_KEY = 'retrotoyz_db'
const COLLECTION_KEY = 'retrotoyz_collection'

function loadToys() {
  let userToys = []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) userToys = JSON.parse(stored) || []
  } catch { /* ignore */ }
  // Merge: SEED_TOYS as base, user-added toys on top (no duplicates)
  const seedIds = new Set(SEED_TOYS.map(t => t.id))
  const userOnly = userToys.filter(t => !seedIds.has(t.id))
  const merged = [...userOnly, ...SEED_TOYS]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  return merged
}

function loadCollection() {
  try {
    const stored = localStorage.getItem(COLLECTION_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function useToys() {
  const [toys, setToys] = useState(loadToys)
  const [collection, setCollection] = useState(loadCollection)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
  }, [toys])

  useEffect(() => {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection))
  }, [collection])

  const addToy = useCallback((toy) => {
    setToys(prev => {
      if (prev.some(t => t.id === toy.id)) return prev
      return [toy, ...prev]
    })
  }, [])

  const addToys = useCallback((newToys) => {
    setToys(prev => {
      const existingIds = new Set(prev.map(t => t.id))
      const unique = newToys.filter(t => !existingIds.has(t.id))
      return unique.length ? [...unique, ...prev] : prev
    })
  }, [])

  const toggleCollection = useCallback((toyId) => {
    setCollection(prev =>
      prev.includes(toyId)
        ? prev.filter(id => id !== toyId)
        : [...prev, toyId]
    )
  }, [])

  const isInCollection = useCallback((toyId) => {
    return collection.includes(toyId)
  }, [collection])

  const searchToys = useCallback((query, filters = {}) => {
    let results = toys
    if (query) {
      const q = query.toLowerCase()
      results = results.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.brand.toLowerCase().includes(q) ||
        t.line.toLowerCase().includes(q)
      )
    }
    if (filters.category) {
      results = results.filter(t => t.category === filters.category)
    }
    if (filters.yearStart) {
      results = results.filter(t => t.year >= filters.yearStart)
    }
    if (filters.yearEnd) {
      results = results.filter(t => t.year <= filters.yearEnd)
    }
    if (filters.sort === 'year-asc') {
      results.sort((a, b) => a.year - b.year)
    } else if (filters.sort === 'year-desc') {
      results.sort((a, b) => b.year - a.year)
    } else if (filters.sort === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name))
    }
    return results
  }, [toys])

  const getToy = useCallback((id) => {
    return toys.find(t => t.id === id)
  }, [toys])

  const getCollectionToys = useCallback(() => {
    return toys.filter(t => collection.includes(t.id))
  }, [toys, collection])

  return {
    toys,
    collection,
    addToy,
    addToys,
    toggleCollection,
    isInCollection,
    searchToys,
    getToy,
    getCollectionToys,
  }
}
