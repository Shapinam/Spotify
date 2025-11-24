import { axiosInstance } from "@/lib/axios";
import type { Album, Song } from "@/types";
import {create} from "zustand";

interface MusicStore{
    songs:Song[];
    albums:Album[];
    isLoading:boolean;
    error:string|null;
    currentAlbum:Album|null;
    madeForYouSongs:Song[];
    featuredSongs:Song[];
    trendingSongs:Song[];

    fetchAlbums:()=>Promise<void>;
    fetchAlbumById:(id:string)=>Promise<void>;
    fetchFeaturedSongs:()=>Promise<void>;
    fetchTrendingSongs:()=>Promise<void>;
    fetchMadeForYouSongs:()=>Promise<void>;
    
}

export const useMusicStore = create<MusicStore>((set) => ({
    songs: [],
    albums: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    madeForYouSongs: [],
    featuredSongs: [],
    trendingSongs: [],

    fetchAlbums: async () => {
        set({isLoading: true,error: null});

        try {
            const response = await axiosInstance.get("/albums");
            set({albums: response.data});
        } catch (error:any) {
            set({error: error.response.data.message});
        } finally {
            set({isLoading: false});
        }
    },

    fetchAlbumById: async (id) => {
        set({isLoading: true,error: null});

        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({currentAlbum: response.data});
        } catch (error:any) {
            set({error: error.response.data.message});
        } finally {
            set({isLoading: false});
        }
},

    fetchFeaturedSongs: async () => {
    set({isLoading: true,error: null});
    try{
        const response = await axiosInstance.get("/songs/FeaturedSongs");
        set({featuredSongs: response.data});
    }catch(error:any){
        set({error: error.response.data.message});
    }finally{
        set({isLoading: false});
    }
    },

    fetchTrendingSongs: async () => {
    set({isLoading: true,error: null});
    try{
        const response = await axiosInstance.get("/songs/Trending");
        set({trendingSongs: response.data});
    }catch(error:any){
        set({error: error.response.data.message});
    }finally{
        set({isLoading: false});
    }
    },

    fetchMadeForYouSongs: async () => {
    set({isLoading: true,error: null});
    try{
        const response = await axiosInstance.get("/songs/MadeForYou");
        set({madeForYouSongs: response.data});
    }catch(error:any){
        set({error: error.response.data.message});
    }finally{
        set({isLoading: false});
    }
    },
}));