"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Clock, 
  Users, 
  TrendingUp,
  Lightbulb,
  Factory,
  Target,
  ArrowRight
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  date: string;
  featured?: boolean;
  content?: string;
  technology?: string;
  pros?: string[];
  cons?: string[];
  bestFor?: string[];
}

interface NewsletterResponse {
  message?: string;
  error?: string;
}

export default function BlogComponent(): JSX.Element {
  // Educational blog data focused on weaving technologies for beginners
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Weaving Machines 101: Understanding Basic Looms for New Business Owners",
      excerpt: "Start your textile journey with this beginner's guide to traditional weaving looms and their modern applications.",
      category: "Beginner Guide",
      readTime: "6 min read",
      image: "/blog/basic-looms.jpg",
      date: "Jan 15, 2024",
      featured: true,
      technology: "Basic Looms",
      pros: ["Low initial investment", "Easy to operate", "Low maintenance"],
      cons: ["Slower production", "Limited design complexity", "Manual operation"],
      bestFor: ["Small startups", "Handicraft businesses", "Learning purposes"]
    },
    {
      id: 2,
      title: "Rapier Weaving Machines: The All-Rounder Solution for Small Manufacturers",
      excerpt: "Discover how rapier technology offers versatility and quality for various fabric types at affordable costs.",
      category: "Rapier Technology",
      readTime: "8 min read",
      image: "/blog/rapier-weaving.jpg",
      date: "Jan 12, 2024",
      technology: "Rapier Weaving",
      pros: ["Versatile fabric production", "Good for fancy designs", "Moderate speed"],
      cons: ["Higher power consumption", "Regular maintenance needed", "Limited very high speeds"],
      bestFor: ["Fashion fabrics", "Home textiles", "Small to medium enterprises"]
    },
    {
      id: 3,
      title: "Air Jet Weaving: High-Speed Production for Growing Businesses",
      excerpt: "Learn how air jet technology can boost your production capacity with incredible speed and efficiency.",
      category: "Air Jet Technology",
      readTime: "7 min read",
      image: "/blog/air-jet.jpg",
      date: "Jan 10, 2024",
      technology: "Air Jet Weaving",
      pros: ["Very high production speed", "Low labor cost", "Energy efficient"],
      cons: ["Higher initial investment", "Limited to lighter fabrics", "Compressed air required"],
      bestFor: ["Mass production", "Plain fabrics", "Large scale manufacturing"]
    },
    {
      id: 4,
      title: "Water Jet Weaving: The Cost-Effective Solution for Synthetic Fabrics",
      excerpt: "Explore water jet weaving - perfect for synthetic materials with lower operational costs.",
      category: "Water Jet Technology",
      readTime: "6 min read",
      image: "/blog/water-jet.jpg",
      date: "Jan 8, 2024",
      technology: "Water Jet Weaving",
      pros: ["Lowest production cost", "High speed", "Minimal yarn damage"],
      cons: ["Only for hydrophobic fibers", "Water treatment needed", "Not for natural fibers"],
      bestFor: ["Polyester fabrics", "Nylon materials", "Cost-sensitive production"]
    },
    {
      id: 5,
      title: "Projectile Weaving: Heavy-Duty Performance for Technical Textiles",
      excerpt: "Understand how projectile weaving handles heavy yarns and complex patterns with precision.",
      category: "Projectile Technology",
      readTime: "7 min read",
      image: "/blog/projectile-weaving.jpg",
      date: "Jan 5, 2024",
      technology: "Projectile Weaving",
      pros: ["Handles heavy fabrics", "Versatile yarn range", "High quality edges"],
      cons: ["Higher noise levels", "Complex maintenance", "Slower than jet weaving"],
      bestFor: ["Industrial fabrics", "Heavy materials", "Technical textiles"]
    },
    {
      id: 6,
      title: "Choosing Your First Weaving Machine: A Practical Guide for New Entrepreneurs",
      excerpt: "Make informed decisions with our step-by-step guide to selecting the right weaving technology for your business.",
      category: "Investment Guide",
      readTime: "10 min read",
      image: "/blog/choosing-machine.jpg",
      date: "Jan 3, 2024",
      technology: "Selection Guide",
      pros: ["Informed decision making", "Cost optimization", "Future-proof investment"],
      cons: ["Requires research", "Initial learning curve", "Market analysis needed"],
      bestFor: ["New entrepreneurs", "Business expansion", "Technology upgrade"]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const categories: string[] = ["All", "Beginner Guide", "Rapier Technology", "Air Jet Technology", "Water Jet Technology", "Projectile Technology", "Investment Guide"];

  const filteredPosts: BlogPost[] = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost: BlogPost | undefined = blogPosts.find(post => post.featured);

  // Stats for the industry
  const industryStats = [
    { icon: <Factory className="w-6 h-6" />, value: "85%", label: "Indian Market Uses Rapier & Air Jet" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "40%", label: "Higher Efficiency vs Traditional" },
    { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Small Units in Tier 2/3 Cities" },
    { icon: <Target className="w-6 h-6" />, value: "2-3 Years", label: "ROI Period for New Machines" }
  ];

  const handleCategoryChange = (category: string): void => {
    setSelectedCategory(category);
  };

  const handleReadMore = (postId: number): void => {
    // In a real app, this would navigate to the full article
    console.log(`Reading more about post ${postId}`);
    alert(`This would open the full article for post ${postId}. In a real application, you would navigate to a detailed blog post page.`);
  };

  const handleSubscribe = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage("🎉 Successfully subscribed to weaving technology updates!");
      setEmail("");
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to render technology specs card
  const renderTechSpecs = (post: BlogPost): JSX.Element | null => {
    if (!post.technology || !post.pros) return null;

    return (
      <div className="mt-6 p-4 bg-gradient-to-br from-blue-50/80 to-amber-50/60 rounded-lg border border-amber-200/50 backdrop-blur-sm">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-600" />
          Technology Overview: {post.technology}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {post.pros && (
            <div>
              <h5 className="font-medium text-green-700 mb-2">✓ Advantages</h5>
              <ul className="space-y-1 text-gray-700">
                {post.pros.map((pro, index) => (
                  <li key={index}>• {pro}</li>
                ))}
              </ul>
            </div>
          )}
          
          {post.bestFor && (
            <div>
              <h5 className="font-medium text-blue-700 mb-2">🎯 Best For</h5>
              <ul className="space-y-1 text-gray-700">
                {post.bestFor.map((use, index) => (
                  <li key={index}>• {use}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Function to render blog image with educational theme
  const renderBlogImage = (post: BlogPost, isFeatured: boolean = false): JSX.Element => {
    const techIcons = {
      "Basic Looms": "🏭",
      "Rapier Weaving": "⚡",
      "Air Jet Weaving": "💨",
      "Water Jet Weaving": "💧",
      "Projectile Weaving": "🚀",
      "Selection Guide": "📊"
    };

    return (
      <div className="relative h-48 lg:h-64 overflow-hidden bg-gradient-to-br from-blue-100/80 to-amber-100/80 flex items-center justify-center border-b border-amber-200/50">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-blue-500/10"></div>
        <div className="text-center p-6 relative z-10">
          <div className="text-4xl mb-3">{techIcons[post.technology as keyof typeof techIcons] || "🏭"}</div>
          <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm backdrop-blur-sm">
            <BookOpen className="w-6 h-6 text-amber-600" />
          </div>
          <p className="text-gray-800 font-medium text-sm">Educational Content</p>
          <p className="text-gray-700 text-xs mt-1">Perfect for Beginners</p>
        </div>
        {isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-xs font-medium shadow-sm">
              Featured
            </span>
          </div>
        )}
        {!isFeatured && (
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-amber-800 rounded text-xs font-medium border border-amber-300/50">
              {post.category}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-amber-50/20 pt-24 pb-20">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Main gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-amber-50/30" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        
        {/* Floating gradient orbs */}
        <motion.div 
          className="absolute top-1/4 -left-10 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-cyan-200/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-10 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-200/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Blog Hero Section - Enhanced with Gradient */}
      <section className="relative py-16">
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-amber-200/50 backdrop-blur-sm">
              <BookOpen className="w-4 h-4" />
              Educational Resource Center
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Weaving Technology <span className="text-amber-600">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
              Beginner-friendly guides to help you understand different weaving machines and choose the right technology for your textile business in tier 2 & 3 cities.
            </p>
            
            {/* Industry Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {industryStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="text-amber-600 flex justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-700">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Category Filters - Enhanced with Gradient */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm backdrop-blur-sm ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/25"
                      : "bg-white/80 text-gray-700 hover:bg-white border border-gray-300/50 hover:border-amber-300/70 hover:shadow-md"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Post - Enhanced with Gradient Background */}
      {featuredPost && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-white via-white to-blue-50/30 rounded-2xl shadow-lg border border-amber-200/30 overflow-hidden hover:shadow-xl transition-all duration-500 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {renderBlogImage(featuredPost, true)}
              
              <div className="p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-blue-50/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 rounded-full text-xs font-medium border border-amber-200/50">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-600 text-sm">{featuredPost.date}</span>
                  <span className="text-gray-500 text-sm">•</span>
                  <span className="text-gray-600 text-sm">{featuredPost.readTime}</span>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                {/* Technology Specifications */}
                {renderTechSpecs(featuredPost)}
                
                <div className="flex items-center justify-between mt-6">
                  <button 
                    onClick={() => handleReadMore(featuredPost.id)}
                    className="group inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Blog Posts Grid - Enhanced with Gradients */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts
            .filter((post: BlogPost) => !post.featured)
            .map((post: BlogPost, index: number) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-blue-50/20 rounded-xl shadow-md border border-amber-200/30 overflow-hidden hover:shadow-xl transition-all duration-500 group flex flex-col h-full backdrop-blur-sm hover:border-amber-300/50"
              >
                {renderBlogImage(post)}
                
                <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-blue-50/10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-gray-600 text-xs">{post.date}</span>
                    <span className="text-gray-500 text-xs">•</span>
                    <span className="text-gray-600 text-xs">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Quick Tech Info */}
                  {post.technology && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-blue-50/50 to-amber-50/30 rounded-lg border border-blue-200/30">
                      <div className="flex items-center gap-2 text-xs text-gray-700 mb-1">
                        <Factory className="w-3 h-3" />
                        <span className="font-semibold">{post.technology}</span>
                      </div>
                      {post.bestFor && (
                        <p className="text-xs text-gray-600 line-clamp-2">
                          Perfect for: {post.bestFor.slice(0, 2).join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <button 
                    onClick={() => handleReadMore(post.id)}
                    className="group inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-all duration-300 mt-auto"
                  >
                    <span>Learn this technology</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </motion.article>
            ))}
        </div>

        {/* Learning Path CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-white to-amber-50/30 rounded-2xl p-8 border border-amber-200/50 shadow-lg backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Start Your Weaving Technology Journey
            </h3>
            <p className="text-gray-700 mb-6">
              Follow our structured learning path from basic looms to advanced weaving technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/25">
                View Learning Path
              </button>
              <button className="border border-amber-300/70 text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50/50 transition-all duration-300 backdrop-blur-sm">
                Download PDF Guide
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Educational Newsletter Section - Enhanced Gradient */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-br from-blue-100/40 via-amber-100/30 to-blue-100/40 rounded-2xl p-8 md:p-12 text-center border border-amber-200/50 shadow-lg backdrop-blur-sm"
        >
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-100 to-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-amber-200/50">
              <BookOpen className="w-8 h-8 text-amber-600" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Get Weekly Weaving Technology Lessons
            </h2>
            <p className="text-gray-700 mb-2">
              Receive beginner-friendly articles, technology comparisons, and investment guides every week.
            </p>
            
            <p className="text-amber-700 font-semibold text-sm mb-6">
              Perfect for new textile business owners in tier 2 & 3 cities
            </p>

            {/* Success/Error Message */}
            {message && (
              <div className={`text-center mb-6 p-4 rounded-lg backdrop-blur-sm ${
                message.includes("🎉") 
                  ? "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200/50" 
                  : "bg-gradient-to-r from-red-100 to-red-50 text-red-800 border border-red-200/50"
              }`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for weekly lessons"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300/70 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-gray-900 placeholder-gray-600 bg-white/80 backdrop-blur-sm"
                required
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  "Get Free Lessons"
                )}
              </button>
            </form>

            <p className="text-gray-600 text-xs mt-4">
              No spam. Unsubscribe anytime. Start learning in 2 minutes.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}