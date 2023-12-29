import { createContext, useContext, useMemo, useState } from 'react'
import { createRandomPost } from './helper'

// 1. CREATE A CONTEXT
const AppContext = createContext()

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

  const value = useMemo(() => {
    return {
      posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
    }
  }, [searchQuery, searchedPosts])

  return (
    // 2. PROVIDE VALUE TO CHILD COMPONENTS
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider')
  }

  return context
}
