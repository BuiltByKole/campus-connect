import { Link } from '@tanstack/react-router'
import { useAuthStore } from '../store/authStore'

export default function LandingPage() {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container-lg py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">CampusConnect</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-secondary btn-sm">
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container-lg text-center">
          <h1 className="mb-6 text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-forest-600 bg-clip-text text-transparent">
            Find Your Opportunity
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600 leading-relaxed">
            Discover verified SIWES, internships, industrial training, externships, and student-placement opportunities designed for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/opportunities" className="btn btn-primary btn-lg">
              Explore Opportunities
            </Link>
            <Link to="/signup" className="btn btn-outline btn-lg">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container-lg">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Create Profile', description: 'Set up your student profile with your academic details.' },
              { step: '2', title: 'Discover Opportunities', description: 'Browse verified opportunities matched to your field and interests.' },
              { step: '3', title: 'Apply & Track', description: 'Apply directly and track your applications from your dashboard.' },
            ].map((item) => (
              <div key={item.step} className="card p-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunity Types */}
      <section className="py-20">
        <div className="container-lg">
          <h2 className="text-3xl font-bold text-center mb-16">Opportunity Types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { type: 'SIWES', icon: '📚' },
              { type: 'Internship', icon: '💼' },
              { type: 'Industrial Training', icon: '🏭' },
              { type: 'Externship', icon: '🎓' },
              { type: 'Placement', icon: '🚀' },
            ].map((item) => (
              <div key={item.type} className="card p-6 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold">{item.type}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-emerald-50 border-t border-emerald-200">
        <div className="container-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Verified & Trusted</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700 mb-6">
              Every company and opportunity on CampusConnect goes through our verification process. We ensure you only discover legitimate, verified opportunities from organizations that care about your growth.
            </p>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-3xl font-bold text-emerald-600">✓</p>
                <p className="text-sm text-gray-600 mt-2">Verified Companies</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-600">✓</p>
                <p className="text-sm text-gray-600 mt-2">Verified Opportunities</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-600">✓</p>
                <p className="text-sm text-gray-600 mt-2">Student-Centric</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container-lg">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">For Students</h3>
              <ul className="space-y-3">
                {[
                  'Search and filter opportunities',
                  'Save opportunities for later',
                  'Apply directly through CampusConnect',
                  'Track application status',
                  'Manage your student profile',
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <span className="text-emerald-600 font-bold mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">For Companies</h3>
              <ul className="space-y-3">
                {[
                  'Create a verified company profile',
                  'Publish opportunities for review',
                  'Reach qualified students',
                  'Manage applications efficiently',
                  'Build your employer brand',
                ].map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <span className="text-emerald-600 font-bold mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-forest-600">
        <div className="container-lg text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Next Opportunity?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students discovering verified opportunities across Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/opportunities" className="btn bg-white text-emerald-600 hover:bg-gray-100 btn-lg">
              Browse Opportunities
            </Link>
            <Link to="/signup" className="btn border-2 border-white text-white hover:bg-white hover:bg-opacity-10 btn-lg">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-lg">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg"></div>
                <span className="text-lg font-bold">CampusConnect</span>
              </div>
              <p className="text-gray-400 text-sm">Finding verified opportunities for Nigerian students.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/opportunities" className="hover:text-white">Opportunities</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Companies</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/signup" className="hover:text-white">Post Opportunity</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm text-gray-400">support@campusconnect.ng</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 CampusConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
