'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllPosts, getFeaturedPosts, getAllCategories } from '@/data/blog'

const categoryColors: Record<string, string> = {
  Governance: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  Security: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  Climate: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  Development: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
}

export default function BlogClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  const categories = getAllCategories()

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const filteredFeatured = (selectedCategory === 'All' && searchQuery === '')
    ? featuredPosts
    : featuredPosts.filter(post => {
        const matchesSearch = searchQuery === '' || 
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
        return matchesSearch && matchesCategory
      })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-foreground font-medium">Blog</li>
            </ol>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Research{' '}
              <span className="gradient-text">Insights & Analysis</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Expert perspectives on governance, security, and policy research from our team of analysts and guest contributors.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 h-10 sm:h-11 bg-card border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  className="whitespace-nowrap h-9 sm:h-10"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {filteredFeatured.length > 0 && (
        <section className="py-8 sm:py-12 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
              <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-primary rounded-full" />
              Featured Articles
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {filteredFeatured.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="rounded-xl sm:rounded-2xl bg-card border border-border overflow-hidden card-hover h-full">
                      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary/20 to-accent/20">
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className={`${categoryColors[post.category]} text-xs border`}>
                            {post.category}
                          </Badge>
                          <Badge className="bg-accent text-accent-foreground text-xs">
                            Featured
                          </Badge>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div>
                            <p className="text-sm font-medium">{post.author}</p>
                            <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                          </div>
                          <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read Article
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-8 sm:py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center gap-2">
            <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-accent rounded-full" />
            {searchQuery || selectedCategory !== 'All' ? `Results (${filteredPosts.length})` : 'All Articles'}
          </h2>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="rounded-xl bg-card border border-border overflow-hidden card-hover h-full flex flex-col">
                      <div className="relative h-36 sm:h-40 bg-gradient-to-br from-primary/10 to-accent/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                        <div className="absolute top-3 left-3">
                          <Badge className={`${categoryColors[post.category]} text-[10px] sm:text-xs border`}>
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-[10px] sm:text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
                          <span className="text-[10px] sm:text-xs text-muted-foreground">
                            {post.author}
                          </span>
                          <span className="text-[10px] sm:text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 sm:py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center p-6 sm:p-8 lg:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 border border-border">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Stay Updated</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest research insights and policy analysis.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-10 sm:h-11 bg-background"
              />
              <Button type="submit" className="btn-primary h-10 sm:h-11">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
