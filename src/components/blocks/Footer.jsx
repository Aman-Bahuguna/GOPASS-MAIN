import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Instagram, Twitter, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Footer = () => {
    const footerRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef([]);
    const socialRef = useRef([]);
    const orbsRef = useRef([]);
    const waveRef = useRef(null);
    const decorLineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Main timeline for footer entrance
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top bottom-=100',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animated decorative line reveal
            tl.fromTo(decorLineRef.current,
                { scaleX: 0, transformOrigin: 'left center' },
                { scaleX: 1, duration: 1.2, ease: 'power3.out' }
            );

            // Logo text reveal with split effect
            if (logoRef.current) {
                const chars = logoRef.current.querySelectorAll('.char');
                tl.fromTo(chars,
                    { y: 100, opacity: 0, rotateX: -90 },
                    {
                        y: 0,
                        opacity: 1,
                        rotateX: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: 'back.out(1.7)'
                    },
                    '-=0.8'
                );
            }

            // Staggered link columns animation
            linksRef.current.forEach((linkGroup, index) => {
                if (linkGroup) {
                    const links = linkGroup.querySelectorAll('a, h3');
                    tl.fromTo(links,
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            stagger: 0.1,
                            ease: 'power2.out'
                        },
                        '-=0.6'
                    );
                }
            });

            // Social icons with magnetic effect
            socialRef.current.forEach((icon, index) => {
                if (icon) {
                    tl.fromTo(icon,
                        { scale: 0, rotate: -180 },
                        {
                            scale: 1,
                            rotate: 0,
                            duration: 0.6,
                            ease: 'elastic.out(1, 0.5)',
                            delay: index * 0.1
                        },
                        '-=0.5'
                    );

                    // Magnetic hover effect
                    icon.addEventListener('mousemove', (e) => {
                        const rect = icon.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;

                        gsap.to(icon, {
                            x: x * 0.3,
                            y: y * 0.3,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    });

                    icon.addEventListener('mouseleave', () => {
                        gsap.to(icon, {
                            x: 0,
                            y: 0,
                            duration: 0.5,
                            ease: 'elastic.out(1, 0.5)'
                        });
                    });
                }
            });

            // Floating orbs animation
            orbsRef.current.forEach((orb, index) => {
                if (orb) {
                    gsap.to(orb, {
                        y: 'random(-30, 30)',
                        x: 'random(-20, 20)',
                        scale: 'random(0.8, 1.2)',
                        duration: 'random(3, 5)',
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: index * 0.5
                    });
                }
            });

            // Wave animation
            if (waveRef.current) {
                gsap.to(waveRef.current, {
                    attr: { d: 'M0,20 Q25,10 50,20 T100,20 V100 H0 Z' },
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }

        }, footerRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        gsap.to(window, {
            scrollTo: { y: 0 },
            duration: 1.5,
            ease: 'power3.inOut'
        });
    };

    const footerLinks = [
        {
            title: 'Product',
            links: [
                { name: 'Features', href: '/features' },
                { name: 'Events', href: '/events' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'Community', href: '/community' }
            ]
        },
        {
            title: 'Company',
            links: [
                { name: 'About', href: '/about' },
                { name: 'Blog', href: '/blog' },
                { name: 'Careers', href: '/careers' },
                { name: 'Press Kit', href: '/press' }
            ]
        },
        {
            title: 'Resources',
            links: [
                { name: 'Documentation', href: '/docs' },
                { name: 'Help Center', href: '/help' },
                { name: 'API', href: '/api' },
                { name: 'Status', href: '/status' }
            ]
        },
        {
            title: 'Legal',
            links: [
                { name: 'Privacy', href: '/privacy' },
                { name: 'Terms', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' },
                { name: 'Licenses', href: '/licenses' }
            ]
        }
    ];

    const socialLinks = [
        { icon: Instagram, url: '#', color: 'from-purple-500 to-pink-500' },
        { icon: Twitter, url: '#', color: 'from-blue-400 to-blue-600' },
        { icon: Linkedin, url: '#', color: 'from-blue-600 to-blue-800' },
        { icon: Mail, url: '#', color: 'from-emerald-500 to-teal-500' }
    ];

    return (
        <footer ref={footerRef} className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating gradient orbs */}
                <div ref={el => orbsRef.current[0] = el} className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-brand-100/20 to-brand-200/10 rounded-full blur-[100px]" />
                <div ref={el => orbsRef.current[1] = el} className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-gradient-to-tl from-emerald-500/15 to-brand-300/10 rounded-full blur-[120px]" />
                <div ref={el => orbsRef.current[2] = el} className="absolute bottom-[20%] left-[30%] w-[350px] h-[350px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-[100px]" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

                {/* Top wave decoration */}
                <svg className="absolute top-0 left-0 w-full h-24 -mt-1" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path
                        ref={waveRef}
                        d="M0,30 Q25,20 50,30 T100,30 V100 H0 Z"
                        fill="url(#waveGradient)"
                        opacity="0.3"
                    />
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3d70b2" />
                            <stop offset="50%" stopColor="#41d6c3" />
                            <stop offset="100%" stopColor="#5596e6" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Decorative line */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                <div
                    ref={decorLineRef}
                    className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-200 to-transparent mb-16"
                />
            </div>

            {/* Main Footer Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-4">
                        <div className="space-y-6">
                            {/* Animated Logo */}
                            <div ref={logoRef} className="text-4xl md:text-5xl font-bold font-serif perspective-[1000px]">
                                {'gopass'.split('').map((char, index) => (
                                    <span
                                        key={index}
                                        className="char inline-block bg-gradient-to-r from-white via-brand-200 to-brand-300 bg-clip-text text-transparent"
                                        style={{ display: 'inline-block' }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>

                            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                                Connecting you to culture, community, and unforgettable experiences. Your gateway to extraordinary events.
                            </p>

                            {/* Social Icons */}
                            <div className="flex items-center gap-4">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={index}
                                            href={social.url}
                                            ref={el => socialRef.current[index] = el}
                                            className={`group relative w-12 h-12 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer`}
                                        >
                                            <Icon className="w-5 h-5 text-white relative z-10" />
                                            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {footerLinks.map((section, sectionIndex) => (
                                <div
                                    key={sectionIndex}
                                    ref={el => linksRef.current[sectionIndex] = el}
                                    className="space-y-4"
                                >
                                    <h3 className="text-white font-semibold text-lg mb-4">
                                        {section.title}
                                    </h3>
                                    <ul className="space-y-3">
                                        {section.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link
                                                    to={link.href}
                                                    className="text-slate-400 hover:text-brand-200 transition-colors duration-300 inline-block relative group"
                                                >
                                                    {link.name}
                                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-200 group-hover:w-full transition-all duration-300" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-16 pt-12 border-t border-slate-700/50">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-semibold mb-2">Stay in the loop</h3>
                            <p className="text-slate-400">Get the latest events and updates delivered to your inbox.</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-brand-200 transition-colors duration-300 w-full md:w-80"
                            />
                            <button className="px-8 py-3 bg-gradient-to-r from-brand-100 to-brand-200 text-white rounded-full font-medium hover:scale-105 active:scale-95 transition-transform duration-300 shadow-lg shadow-brand-100/30 whitespace-nowrap">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm flex items-center gap-2">
                        © 2024 GoPass. Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> by the GoPass Team
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 px-6 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-slate-400 hover:text-white transition-all duration-300"
                    >
                        Back to top
                        <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-100 via-brand-200 to-brand-300" />
        </footer>
    );
};

export default Footer;
