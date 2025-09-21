import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            {/* Creative product-focused header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full px-6 py-2 text-sm font-medium text-purple-700 ring-1 ring-purple-200 mb-6">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                </svg>
                Magical Event Management (No Wands Required!)
              </div>
            </div>
            
            <h1 className="text-balance text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Turn Every
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-800 bg-clip-text text-transparent"> Character </span>
              Into a
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent"> SuperGuest</span>
            </h1>
            
            <p className="mt-8 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              Create enchanted gatherings, streamline magical check-ins, and build lasting friendships across all realms.{` `}
              <span className="font-semibold text-gray-800">SuperGuest</span> is the only platform trusted by fairy godmothers, 
              royal event planners, and even reformed villains (we&apos;re looking at you, Maleficent 👑).
            </p>
            
            {/* Visual stats/social proof */}
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                <span>1,000+ Royal Balls Hosted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>50K+ Fairy Tale Characters Managed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                <span>Zero Dragons Crashed (This Year)</span>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Host your first magical gathering
              </Link>
              <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                Discover the magic <span aria-hidden="true">✨</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-purple-600">
              Enchanted Event Tools
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage legendary gatherings
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From planning royal balls to organizing dragon slaying conferences, our magical platform handles all the realm-crossing event management so you can focus on the important stuff (like making sure the Evil Queen doesn&apos;t crash the party).
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  Magic Carpet Import
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Import your guest lists from any realm! Our enchanted scrolls support formats from Crystal Ball CSVs to Dragon-Mail databases. Even accepts carrier pigeon attachments.
                </dd>
              </div>
              
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Character Tracking
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Real-time character check-ins with magical verification! Instantly detect if someone&apos;s under a spell, cursed, or just having a bad hair day. Works even for shapeshifters and fairy godmothers in disguise.
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  Character Discovery
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Advanced magical search to find the perfect attendees! Filter by kingdom, magical abilities, curse status, and whether they&apos;re currently feuding with any other invitees. Conflict-free guest lists guaranteed!
                </dd>
              </div>

              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  Magical Analytics & Fortune Telling
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Crystal ball-powered analytics show who RSVPed but will arrive fashionably late (looking at you, Cinderella), which villains are planning to crash the party, and how many fairy godmothers you&apos;ll need for damage control.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to host the most legendary gatherings in all the realms?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-purple-200">
              Join fairy godmothers, royal event planners, and reformed villains who trust SuperGuest to manage their magical gatherings. No dragon insurance required (but recommended).
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-600 shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start your magical journey
              </Link>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                See the magic in action <span aria-hidden="true">🪄</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
