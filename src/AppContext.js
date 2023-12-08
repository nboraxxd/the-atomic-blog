import { createContext, useState } from 'react'
import { createRandomPost } from './helper'

// 1. CREATE A CONTEXT
export const AppContext = createContext()

export default function AppProvider({ children }) {
  const [posts, setPosts] = useState(() => Array.from({ length: 30 }, () => createRandomPost()))
  const [searchQuery, setSearchQuery] = useState('')

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) => `${post.title} ${post.body}`.toLowerCase().includes(searchQuery.toLowerCase()))
      : posts

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts])
  }

  function handleClearPosts() {
    setPosts([])
  }

  return (
    // 2. PROVIDE VALUE TO CHILD COMPONENTS
    <AppContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}