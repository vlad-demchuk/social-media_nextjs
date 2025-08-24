import { ArrowRight, Users, MessageSquare, Heart } from "lucide-react";
import heroImage from "@/assets/auth-hero.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default async function RootPage() {

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-foreground mb-6">
              Connect, Share,
              <span className="text-primary"> Discover</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Join millions of people sharing their thoughts, ideas, and moments
              in real-time. Experience social media the way it should be -
              simple, beautiful, and meaningful.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth">
                <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/feed">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 rounded-xl"
                >
                  Explore Feed
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything you need to stay connected
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with modern design principles and user experience in mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-200">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Connect with People</h3>
            <p className="text-muted-foreground">
              Build meaningful relationships and discover new communities that
              share your interests.
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-200">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Share Your Voice</h3>
            <p className="text-muted-foreground">
              Express yourself with posts, images, and engage in conversations
              that matter to you.
            </p>
          </div>

          <div className="text-center p-8 bg-gradient-card rounded-xl shadow-soft hover:shadow-medium transition-all duration-200">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Spread Positivity</h3>
            <p className="text-muted-foreground">
              Like, share, and support content that inspires you and brings joy
              to others.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to join the conversation?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Create your account today and start connecting with people who
              share your passions.
            </p>
            <Link href="/auth">
              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-6 rounded-xl"
              >
                Join SocialFlow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
