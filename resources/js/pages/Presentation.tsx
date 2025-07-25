import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Trophy, Zap } from 'lucide-react';

interface Props {
    completionCount: number;
    justCompleted?: boolean;
    [key: string]: unknown;
}

interface Slide {
    id: number;
    title: string;
    joke: string;
    punchline: string;
    color: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Welcome to Lamborghini Laughs! 🏎️",
        joke: "Why did the Lamborghini break up with the Ferrari?",
        punchline: "Because it was tired of all the drama and wanted something more... bull-headed!",
        color: "from-red-600 to-red-800"
    },
    {
        id: 2,
        title: "Speed Demons 💨",
        joke: "What do you call a Lamborghini that won't start?",
        punchline: "A Lamborgh-can't-ini! But don't worry, it's probably just taking a bull break.",
        color: "from-red-500 to-red-700"
    },
    {
        id: 3,
        title: "Parking Problems 🅿️",
        joke: "Why don't Lamborghinis ever get parking tickets?",
        punchline: "Because they're always in the fast lane... even when parked! The meter maids can't catch up!",
        color: "from-red-700 to-red-900"
    },
    {
        id: 4,
        title: "Bull Market 📈",
        joke: "What's the difference between a Lamborghini and a bull?",
        punchline: "One charges at red flags, the other charges your credit card! Both will leave you broke and breathless.",
        color: "from-red-400 to-red-600"
    },
    {
        id: 5,
        title: "Final Lap 🏁",
        joke: "Why did the Lamborghini go to therapy?",
        punchline: "It had too many issues with commitment - it kept accelerating away from every relationship! Now it's learning to slow down and enjoy the ride.",
        color: "from-red-800 to-red-950"
    }
];

export default function Presentation({ completionCount, justCompleted = false }: Props) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showPunchline, setShowPunchline] = useState(false);
    const [hasCompleted, setHasCompleted] = useState(justCompleted);

    const isLastSlide = currentSlide === slides.length - 1;
    const isFirstSlide = currentSlide === 0;

    useEffect(() => {
        setShowPunchline(false);
    }, [currentSlide]);

    const nextSlide = () => {
        if (isLastSlide) {
            if (!hasCompleted) {
                handleComplete();
            }
        } else {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (!isFirstSlide) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        router.post(route('presentation.store'), {}, {
            preserveState: false,
            preserveScroll: true,
            onSuccess: () => {
                setHasCompleted(true);
            }
        });
    };

    const currentSlideData = slides[currentSlide];

    return (
        <div className={`min-h-screen bg-gradient-to-br ${currentSlideData.color} p-4 transition-all duration-700`}>
            {/* Completion Counter */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-white/90 text-red-800 px-6 py-2 text-lg font-bold shadow-lg backdrop-blur-sm">
                    <Trophy className="w-5 h-5 mr-2" />
                    Global Completions: {completionCount}
                </Badge>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
                    <CardContent className="p-8 md:p-12">
                        {/* Slide Indicator */}
                        <div className="flex justify-center mb-8">
                            <div className="flex space-x-2">
                                {slides.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentSlide 
                                                ? 'bg-red-600 w-8' 
                                                : index < currentSlide 
                                                    ? 'bg-red-400' 
                                                    : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Slide Content */}
                        <div className="text-center space-y-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                                {currentSlideData.title}
                            </h1>

                            <div className="space-y-6">
                                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                                    {currentSlideData.joke}
                                </p>

                                {showPunchline && (
                                    <div className="animate-in slide-in-from-bottom-4 duration-500">
                                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                                            <p className="text-lg md:text-xl text-red-800 font-medium leading-relaxed">
                                                {currentSlideData.punchline}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col space-y-4 pt-8">
                                {!showPunchline ? (
                                    <Button 
                                        onClick={() => setShowPunchline(true)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                                        size="lg"
                                    >
                                        <Zap className="w-5 h-5 mr-2" />
                                        Reveal Punchline
                                    </Button>
                                ) : (
                                    <div className="flex justify-between items-center space-x-4">
                                        <Button
                                            onClick={prevSlide}
                                            disabled={isFirstSlide}
                                            variant="outline"
                                            className="border-red-300 text-red-700 hover:bg-red-50 px-6 py-3"
                                            size="lg"
                                        >
                                            <ChevronLeft className="w-5 h-5 mr-2" />
                                            Previous
                                        </Button>

                                        <Button
                                            onClick={nextSlide}
                                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
                                            size="lg"
                                        >
                                            {isLastSlide ? (
                                                <>
                                                    <Trophy className="w-5 h-5 mr-2" />
                                                    {hasCompleted ? 'Completed!' : 'Complete Presentation'}
                                                </>
                                            ) : (
                                                <>
                                                    Next
                                                    <ChevronRight className="w-5 h-5 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {hasCompleted && (
                                <div className="animate-in slide-in-from-bottom-4 duration-500 pt-4">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                        <div className="flex items-center justify-center space-x-2 text-green-800">
                                            <Trophy className="w-6 h-6" />
                                            <span className="text-lg font-semibold">
                                                Congratulations! You've completed the presentation!
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Progress Bar */}
            <div className="fixed bottom-0 left-0 right-0 h-2 bg-white/20">
                <div 
                    className="h-full bg-white transition-all duration-500 ease-out"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
            </div>
        </div>
    );
}