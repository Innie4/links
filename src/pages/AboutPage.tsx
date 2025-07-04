import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/theme-provider';
import { 
  HeartIcon,
  UsersIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  SparklesIcon,
  TrophyIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface Achievement {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: '/api/placeholder/200/200',
    bio: 'Passionate about connecting communities with local businesses. 10+ years in tech and entrepreneurship.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    image: '/api/placeholder/200/200',
    bio: 'Full-stack developer with expertise in React, Node.js, and cloud architecture.',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#'
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    image: '/api/placeholder/200/200',
    bio: 'UX/UI designer focused on creating beautiful, accessible, and user-friendly experiences.',
    social: {
      twitter: '#',
      linkedin: '#'
    }
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Head of Operations',
    image: '/api/placeholder/200/200',
    bio: 'Operations expert with a background in scaling startups and building efficient processes.',
    social: {
      linkedin: '#'
    }
  }
];

const achievements: Achievement[] = [
  {
    id: '1',
    year: '2023',
    title: 'Launched Platform',
    description: 'Successfully launched Links Local Search with 100+ local providers',
    icon: RocketLaunchIcon
  },
  {
    id: '2',
    year: '2023',
    title: 'First 1000 Users',
    description: 'Reached our first milestone of 1000 active users',
    icon: UsersIcon
  },
  {
    id: '3',
    year: '2024',
    title: '500+ Providers',
    description: 'Expanded to over 500 verified local service providers',
    icon: StarIcon
  },
  {
    id: '4',
    year: '2024',
    title: 'Community Award',
    description: 'Received "Best Local Business Platform" award',
    icon: TrophyIcon
  }
];

export default function AboutPage() {
  const [stats, setStats] = useState({
    providers: 0,
    users: 0,
    searches: 0,
    reviews: 0
  });
  const [animatedStats, setAnimatedStats] = useState({
    providers: 0,
    users: 0,
    searches: 0,
    reviews: 0
  });
  const { theme } = useTheme();

  useEffect(() => {
    const targetStats = {
      providers: 500,
      users: 15000,
      searches: 50000,
      reviews: 2500
    };
    setStats(targetStats);

    // Animate counters
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const animateCounter = (target: number, setter: (value: number) => void) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setter(Math.floor(current));
      }, stepDuration);
    };

    animateCounter(targetStats.providers, (value) => setAnimatedStats(prev => ({ ...prev, providers: value })));
    animateCounter(targetStats.users, (value) => setAnimatedStats(prev => ({ ...prev, users: value })));
    animateCounter(targetStats.searches, (value) => setAnimatedStats(prev => ({ ...prev, searches: value })));
    animateCounter(targetStats.reviews, (value) => setAnimatedStats(prev => ({ ...prev, reviews: value })));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-lg overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-pink-600/30 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="container relative z-10 px-0 sm:px-4">
          <div className="text-center animate-fade-in">
            <div className="flex flex-col xs:flex-row items-center justify-center mb-6 gap-2 xs:gap-4">
              <HeartIcon className="h-10 w-10 xs:h-12 xs:w-12 text-red-500 mr-0 xs:mr-4 animate-pulse" />
              <h1 className="gradient-text text-shadow text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-tight">
                About Links Local Search
              </h1>
            </div>
            <p className="text-base xs:text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              We're on a mission to connect communities with the best local businesses. 
              Our platform makes it easy to discover, review, and connect with trusted service providers in your area.
            </p>
            
            <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-2 xs:gap-4">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <SparklesIcon className="h-5 w-5 text-yellow-500" />
                <span className="text-xs xs:text-sm font-medium">Trusted by 15,000+ users</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <ShieldCheckIcon className="h-5 w-5 text-green-500" />
                <span className="text-xs xs:text-sm font-medium">500+ verified providers</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
                <StarIcon className="h-5 w-5 text-blue-500" />
                <span className="text-xs xs:text-sm font-medium">4.8/5 average rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="card-glass p-8">
              <LightBulbIcon className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6 gradient-text">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                To empower local communities by creating a seamless bridge between residents and trusted service providers. 
                We believe that strong local businesses create stronger communities, and we're committed to making 
                these connections easier, more transparent, and more rewarding for everyone involved.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Whether you're looking for a reliable plumber, a great restaurant, or a trusted mechanic, 
                we're here to help you find the perfect match for your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section-sm">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-glass p-6 text-center animate-slide-left">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <UsersIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {animatedStats.providers}+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Local Providers</p>
            </div>

            <div className="card-glass p-6 text-center animate-fade-in">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {animatedStats.users.toLocaleString()}+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Happy Users</p>
            </div>

            <div className="card-glass p-6 text-center animate-fade-in">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                <StarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {animatedStats.searches.toLocaleString()}+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Successful Searches</p>
            </div>

            <div className="card-glass p-6 text-center animate-slide-right">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <TrophyIcon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {animatedStats.reviews.toLocaleString()}+
              </div>
              <p className="text-gray-600 dark:text-gray-400">Verified Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're a passionate team dedicated to building the best local business discovery platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="card-glass p-6 text-center group hover:scale-105 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold text-2xl">
                  {member.name.charAt(0)}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {member.bio}
                </p>
                
                <div className="flex justify-center space-x-3">
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                      <span className="text-xs">T</span>
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white hover:bg-blue-800 transition-colors">
                      <span className="text-xs">L</span>
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-gray-900 transition-colors">
                      <span className="text-xs">G</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 gradient-text">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Key milestones in our mission to connect communities
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`relative flex items-center mb-8 animate-slide-left`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="absolute left-6 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-4 border-white dark:border-gray-800"></div>
                    
                    <div className="ml-16 flex-1">
                      <div className="card-glass p-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{achievement.title}</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">{achievement.year}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="card-glass p-8 animate-scale-in">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 gradient-text">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Have questions or suggestions? We'd love to hear from you!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <EnvelopeIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">hello@linkslocal.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                      <PhoneIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600 dark:text-gray-400">+234 123 456 7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                      <MapPinIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-gray-600 dark:text-gray-400">Anyigba, Kogi State, Nigeria</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                      <GlobeAltIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Website</h3>
                      <p className="text-gray-600 dark:text-gray-400">www.linkslocal.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                      <ClockIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Business Hours</h3>
                      <p className="text-gray-600 dark:text-gray-400">Mon - Fri: 9AM - 6PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <SparklesIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Support</h3>
                      <p className="text-gray-600 dark:text-gray-400">24/7 Customer Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 