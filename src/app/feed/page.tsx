'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  Search,
  Bell,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  liked: boolean;
  reposted: boolean;
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Mock initial posts
    setPosts([
      {
        id: "1",
        author: {
          name: "Sarah Chen",
          username: "@sarahchen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
        },
        content:
          "Just shipped a new feature that I'm really excited about! The team worked incredibly hard on this one. 🚀",
        timestamp: "2h",
        likes: 24,
        comments: 5,
        reposts: 3,
        liked: false,
        reposted: false,
      },
      {
        id: "2",
        author: {
          name: "Alex Johnson",
          username: "@alexj",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
        },
        content:
          "Beautiful sunset from my evening walk. Sometimes you need to step away from the screen and enjoy the simple things in life. ✨",
        timestamp: "4h",
        likes: 42,
        comments: 8,
        reposts: 12,
        liked: true,
        reposted: false,
      },
      {
        id: "3",
        author: {
          name: "Marcus Rodriguez",
          username: "@marcus_dev",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
        },
        content:
          "Hot take: The best code is the code you don't have to write. Spent today removing 200 lines while adding a new feature. Less is more! 💡",
        timestamp: "6h",
        likes: 89,
        comments: 23,
        reposts: 31,
        liked: true,
        reposted: true,
      },
    ]);
  }, []);

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        username: "@you",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
      },
      content: newPost,
      timestamp: "now",
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
      reposted: false,
    };

    setPosts([post, ...posts]);
    setNewPost("");
    toast({
      title: "Post created!",
      description: "Your post has been shared with your followers.",
    });
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleRepost = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reposted: !post.reposted,
              reposts: post.reposted ? post.reposts - 1 : post.reposts + 1,
            }
          : post
      )
    );

    toast({
      title: "Reposted!",
      description: "Post shared with your followers.",
    });
  };
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">SocialFlow</h1>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search posts, people, and topics"
                  className="w-full pl-10 pr-4 py-2 bg-muted rounded-full border-0 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <aside className="hidden lg:block">
            <Card className="shadow-soft bg-gradient-card border-0">
              <CardContent className="p-6">
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    <Search className="mr-3 h-5 w-5" />
                    Explore
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="mr-3 h-5 w-5" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MessageCircle className="mr-3 h-5 w-5" />
                    Messages
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Feed */}
          <main className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="shadow-soft bg-gradient-card border-0">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=you" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's happening?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="border-0 resize-none focus:ring-0 text-lg"
                      rows={3}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex justify-end pt-0">
                <Button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="rounded-full px-8"
                >
                  Post
                </Button>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="shadow-soft bg-gradient-card border-0 hover:shadow-medium transition-all duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <span className="text-muted-foreground text-sm">
                            {post.author.username}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            ·
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {post.timestamp}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-foreground mb-4 leading-relaxed">
                          {post.content}
                        </p>

                        <div className="flex items-center justify-between max-w-md">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-social-comment"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {post.comments}
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRepost(post.id)}
                            className={`text-muted-foreground hover:text-social-repost ${
                              post.reposted ? "text-social-repost" : ""
                            }`}
                          >
                            <Repeat2 className="h-4 w-4 mr-2" />
                            {post.reposts}
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={`text-muted-foreground hover:text-social-like ${
                              post.liked ? "text-social-like" : ""
                            }`}
                          >
                            <Heart
                              className={`h-4 w-4 mr-2 ${
                                post.liked ? "fill-current" : ""
                              }`}
                            />
                            {post.likes}
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Share className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
