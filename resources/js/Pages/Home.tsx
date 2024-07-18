import React, { useEffect, useState } from 'react'
import fetchPokemon from '@/Redux/thunk/pokeThunk';
import { useAppDispatch, useAppSelector } from '../Redux/hook';
import PokeItems from '@/Components/PokeItems';
import '../../scss/app.scss'
import Pagination from '@/Components/Pagination';
import { Head } from '@inertiajs/react';
import { IPokemon } from '@/types/global';
import { setCurrentPage } from '@/Redux/features/pokeSlice';
function Home() {
    const dispatch = useAppDispatch();
    const { pokeList, status, pagination } = useAppSelector((state) => state.poke)

    useEffect(() => {
        const fetchData = async () => {
        await dispatch(fetchPokemon());
        };
        if (pokeList.length === 0) fetchData();
    }, []);

  const { currentPage, pagesPerPage } = pagination
  const [searchTerm, setSearchTerm] = useState('');

  const indexOfLastPost = currentPage * pagesPerPage;
  const indexOfFirstPost = indexOfLastPost - pagesPerPage;

  const filteredList = pokeList.filter((item: IPokemon | null | undefined) =>
    item && item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPokelist: IPokemon[] = filteredList.slice(indexOfFirstPost, indexOfLastPost)
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCurrentPage(1))
    setSearchTerm(e.target.value);
  };
  return (
    <>
        <Head title="Pokédex List" />
        <div className='px-2 md:px-24 lg:px-64 pt-24 pb-24'>
        {status === 'loading' ? (
            <span className="loader"></span>
        ): (
            <>
            <div className='toolbar'>
                <div className="relative w-1/4">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" placeholder="Search Pokédex" value={searchTerm} onChange={handleSearchChange} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <h2>Pokédex List</h2>
            </div>
            <div className='w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-5 gap-y-6'>
                {currentPokelist.length > 0 ? (
                    currentPokelist.map((item: IPokemon) => <PokeItems pokeName={item.name} />)
                ) : (
                <span className='not-found'>pokemon not found</span>
                )}
            </div>
            <Pagination pokeLength={filteredList.length} />
            </>
        )}
        </div>

    </>
  )
}

export default Home
