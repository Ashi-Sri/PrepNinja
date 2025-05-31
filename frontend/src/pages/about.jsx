import React from 'react';
import { Users, Briefcase, Award, ChevronRight, Mail, Linkedin, Twitter, Github } from 'lucide-react';

const about = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-6 py-24 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">About Our Company</h1>
            <p className="text-2xl font-light opacity-90 leading-relaxed">
              We're on a mission to revolutionize the interview process with AI-powered solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 relative">
              Our Mission
              <span className="absolute bottom-0 left-0 w-20 h-1 bg-emerald-600 -mb-3"></span>
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We believe the traditional interview process is broken. That's why we're building 
              intelligent tools that help companies find the right talent efficiently and fairly.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our AI-powered platform generates tailored interview questions based on job roles, 
              skills, and experience levels to help hiring managers make better decisions.
            </p>
            <button className="mt-6 inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Learn More
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-10 rounded-xl shadow-xl border-l-4 border-emerald-600">
              <svg className="h-12 w-12 text-emerald-600 mb-4 opacity-30" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote className="text-2xl italic text-gray-700 leading-relaxed mb-6">
                "Our platform has transformed how we conduct technical interviews, making the process
                more consistent and efficient while reducing bias."
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold">SJ</div>
                <div className="ml-4">
                  <p className="font-bold text-gray-900 text-lg">Sarah Johnson</p>
                  <p className="text-emerald-600">CTO, TechInnovate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-br from-gray-50 to-stone-100 p-10 rounded-2xl shadow-sm text-center transform transition-transform hover:scale-105">
              <div className="bg-emerald-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-5xl font-bold text-gray-800 mb-2">10,000+</h3>
              <p className="text-lg text-gray-600">Users Worldwide</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-stone-100 p-10 rounded-2xl shadow-sm text-center transform transition-transform hover:scale-105">
              <div className="bg-emerald-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-5xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-lg text-gray-600">Partner Companies</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-stone-100 p-10 rounded-2xl shadow-sm text-center transform transition-transform hover:scale-105">
              <div className="bg-emerald-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-emerald-600" />
              </div>
              <h3 className="text-5xl font-bold text-gray-800 mb-2">15+</h3>
              <p className="text-lg text-gray-600">Industry Awards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-16 text-center relative inline-block mx-auto">
          Meet Our Leadership Team
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-emerald-600 -mb-4"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              name: "Alex Rivera",
              title: "CEO & Co-Founder",
              bio: "Former hiring manager at Google with 12+ years of tech experience."
            },
            {
              name: "Maya Patel",
              title: "CTO & Co-Founder",
              bio: "Machine learning expert with PhD in AI from Stanford University."
            },
            {
              name: "David Chen",
              title: "Head of Product",
              bio: "Led product teams at top SaaS companies for over 8 years."
            }
          ].map((member, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-48 flex items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-white text-emerald-600 flex items-center justify-center text-2xl font-bold">
                  {member.name.split(" ").map(name => name[0]).join("")}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-emerald-600 mb-4 font-medium">{member.title}</p>
                <p className="text-gray-600 mb-6">{member.bio}</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-emerald-600">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-emerald-600">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-emerald-600">
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-br from-gray-50 to-stone-100 py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-16 text-center relative inline-block mx-auto">
            Our Core Values
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-emerald-600 -mb-4"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Innovation",
                description: "We continuously push the boundaries of what's possible with AI in the recruitment space."
              },
              {
                title: "Fairness",
                description: "We build tools that reduce bias and promote equitable hiring practices."
              },
              {
                title: "Transparency",
                description: "We believe in open communication with our customers and within our team."
              },
              {
                title: "Impact",
                description: "We measure our success by the positive change we create for companies and job seekers."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-emerald-600 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{value.title}</h3>
                <p className="text-gray-600 text-lg">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl text-white p-12 md:p-16 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Want to Learn More?</h2>
            <p className="text-xl opacity-90 mb-10 leading-relaxed">
              Contact our team to discover how our AI-powered interview platform can transform your hiring process.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-white text-emerald-700 font-medium rounded-lg hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1">
              <Mail className="mr-3 h-5 w-5" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;