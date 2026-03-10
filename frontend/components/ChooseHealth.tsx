"use client"
import { User, Users, GraduationCap, Check } from 'lucide-react';
import AuthDialog from "@/components/AuthDialog";
import { useState } from 'react';

interface Feature {
  text: string;
  checked: boolean;
}

interface JourneyCard {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  image: string;
  features: Feature[];
  buttonText: string;
  buttonColor: string;
}

export default function HealthcareJourney() {
  const journeyCards: JourneyCard[] = [
    {
      id: 'patients',
      title: 'Patients',
      subtitle: 'Access quality healthcare from anywhere, anytime',
      icon: <User className="w-8 h-8" />,
      iconColor: 'text-blue-600',
      image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop&q=80',
      features: [
        { text: 'Book appointments with verified doctors', checked: true },
        { text: 'Secure video consultations', checked: true },
        { text: 'Digital health records management', checked: true },
        { text: 'Prescription management', checked: true },
        { text: '24/7 emergency support', checked: true }
      ],
      buttonText: 'Start Your Health Journey',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      id: 'providers',
      title: 'Healthcare Providers',
      subtitle: 'Expand your practice and improve patient outcomes',
      icon: <Users className="w-8 h-8" />,
      iconColor: 'text-teal-600',
      image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop&q=80',
      features: [
        { text: 'Digital practice management', checked: true },
        { text: 'Secure patient communications', checked: true },
        { text: 'Integrated scheduling system', checked: true },
        { text: 'Revenue tracking & analytics', checked: true },
        { text: 'Collaborative care tools', checked: true }
      ],
      buttonText: 'Join Our Network',
      buttonColor: 'bg-teal-600 hover:bg-teal-700',
    },
    {
      id: 'consultants',
      title: 'Medical Consultants',
      subtitle: 'Share expertise and collaborate on complex cases',
      icon: <GraduationCap className="w-8 h-8" />,
      iconColor: 'text-yellow-600',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop&q=80',
      features: [
        { text: 'Specialist consultation platform', checked: true },
        { text: 'Second opinion services', checked: true },
        { text: 'Case collaboration tools', checked: true },
        { text: 'Knowledge sharing network', checked: true },
        { text: 'Flexible scheduling options', checked: true }
      ],
      buttonText: 'Become a Consultant',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
    }
  ];
    const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-[#19c3ee] to-[#0cd660] bg-clip-text text-transparent">Healthcare Journey</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tailored experiences designed for patients, healthcare providers, and medical consultants
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {journeyCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
            >
              {/* Icon and Title */}
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className={`${card.iconColor}`}>
                    {card.icon}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {card.subtitle}
                </p>
              </div>

              {/* Image */}
              {/* <div className="relative h-56 w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                    width={250}
                    height={450}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div> */}

              {/* Features List */}
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {card.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        card.id === 'patients' ? 'bg-blue-600' :
                        card.id === 'providers' ? 'bg-teal-600' :
                        'bg-yellow-500'
                      }`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => setAuthDialogOpen(true)}
                  className={`w-full ${card.buttonColor} text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg`}
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
}