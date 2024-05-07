'use client'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useEffect, useState } from 'react'

const Home = () => {
    const [input, setInput] = useState<string>('')
    const [searchResult, setSearchResult] = useState<{
        results: string[]
        duration: number
    }>()

    useEffect(() => {
        const fetchData = async () => {
            if (!input) return setSearchResult(undefined)
            const res = await fetch(`https://fastapi.country-api.workers.dev/api/search?q=${input}`)
            const data = (await res.json()) as { results: string[]; duration: number }
            setSearchResult(data)
        }
        fetchData()
    }, [input])

    return (
        <main className='w-screen h-screen grainy'>
            <div className='flex flex-col items-center pt-32 gap-6 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5'>
                <h1 className='text-5xl tracking-tight font-bold'>Fast Search 🚀</h1>
                <p className='text-lg text-zinc-600 max-w-prose text-center'>
                    A high-performance API Build with Hono, Next.js and Cloudflare.
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, mollitia.
                </p>
                <div className='max-w-md w-full'>
                    <Command>
                        <CommandInput
                            value={input}
                            onValueChange={setInput}
                            placeholder='Search Country...'
                            className='placeholder:text-zinc-500'
                        />
                        <CommandList>
                            {searchResult?.results.length === 0 ? <CommandEmpty>No result found </CommandEmpty> : null}
                            {searchResult?.results ? (
                                <CommandGroup heading='Search Result'>
                                    {searchResult.results.map((result, index) => (
                                        <CommandItem
                                            key={index}
                                            onSelect={setInput}>
                                            {result}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ) : null}
                            {searchResult?.results ? (
                                <>
                                    <div className='h-px w-full bg-zinc-200' />

                                    <p className='p-2 text-zinc-500 text-xs'>
                                        Found {searchResult.results.length} results in {searchResult.duration.toFixed(0)}ms
                                    </p>
                                </>
                            ) : null}
                        </CommandList>
                    </Command>
                </div>
            </div>
        </main>
    )
}
export default Home
