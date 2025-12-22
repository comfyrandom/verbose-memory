import {supabase} from "../libs/supabase.ts";

export const getPostTitle = async (postId: string) : Promise<string | null> => {
    try {
        const { data } = await supabase
            .from('post_content')
            .select('title')
            .eq('id', postId)
            .single();

        if (!data)
            return null;

        return data.title;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}