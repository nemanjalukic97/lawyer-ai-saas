export default function DashboardMockup() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] font-sans shadow-2xl"
      aria-hidden
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#0a0e14] px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto max-w-[220px] flex-1 rounded bg-white/[0.06] py-0.5 text-center text-[11px] text-white/35">
          legantis.app/dashboard
        </div>
      </div>

      <div className="bg-[#0d1117]">
        {/* App navbar */}
        <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0a0e14] px-4 py-2 sm:px-5">
          <div className="flex min-w-0 items-center gap-4 sm:gap-5">
            <span className="shrink-0 text-[11px] font-medium text-white/90 sm:text-[13px]">
              ⚖ Legantis
            </span>
            <div className="hidden gap-3 sm:flex sm:gap-3.5">
              <span className="text-[11px] text-white/50">Dashboard</span>
              <span className="text-[11px] text-white/35">AI Tools</span>
              <span className="text-[11px] text-white/35">Clients</span>
              <span className="text-[11px] text-white/35">Billing</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="rounded-[10px] border border-[#639922]/40 bg-[#639922]/20 px-2 py-0.5 text-[9px] text-[#97c459] sm:text-[10px]">
              Firm plan
            </div>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#378add] to-[#534ab7] text-[9px] font-medium text-white">
              NL
            </div>
          </div>
        </div>

        <div className="px-4 pb-4 pt-4 sm:px-5">
          <div className="mb-1 text-[9px] uppercase tracking-[0.08em] text-white/30 sm:text-[10px]">
            Legantis Dashboard
          </div>
          <div className="mb-0.5 text-[15px] font-medium text-white/90 sm:text-[17px]">
            Welcome back, Nemanja
          </div>
          <div className="mb-3.5 text-[10px] text-white/35 sm:mb-3.5 sm:text-[11px]">
            Bosnia & Herzegovina · Republika Srpska
          </div>

          {/* Stat cards */}
          <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2">
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-2.5 sm:px-3">
              <div className="mb-1 text-[9px] text-white/35 sm:text-[10px]">Total clients</div>
              <div className="text-lg font-medium text-white/90 sm:text-[20px]">5</div>
              <div className="mt-0.5 text-[9px] text-[#5dcaa5] sm:text-[10px]">↑ Active</div>
            </div>
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-2.5 sm:px-3">
              <div className="mb-1 text-[9px] text-white/35 sm:text-[10px]">Active matters</div>
              <div className="text-lg font-medium text-white/90 sm:text-[20px]">1</div>
              <div className="mt-0.5 text-[9px] text-white/30 sm:text-[10px]">Open</div>
            </div>
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-2.5 sm:px-3">
              <div className="mb-1 text-[9px] text-white/35 sm:text-[10px]">Unbilled hours</div>
              <div className="text-lg font-medium text-[#febc2e] sm:text-[20px]">21h</div>
              <div className="mt-0.5 text-[9px] text-white/30 sm:text-[10px]">Invoice ready</div>
            </div>
            <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-2.5 sm:px-3">
              <div className="mb-1 text-[9px] text-white/35 sm:text-[10px]">ROI this month</div>
              <div className="text-lg font-medium text-[#5dcaa5] sm:text-[20px]">16×</div>
              <div className="mt-0.5 text-[9px] text-white/30 sm:text-[10px]">vs subscription</div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mb-2.5">
            <div className="mb-2 text-[10px] font-medium text-white/50 sm:text-[11px]">Quick actions</div>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-1.5">
              <div className="flex flex-col gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] p-2.5">
                <span className="text-base leading-none">📄</span>
                <span className="text-[10px] font-medium text-white/80 sm:text-[11px]">Generate Doc</span>
                <span className="text-[9px] text-white/30 sm:text-[10px]">NDA, contracts...</span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-[#378add]/25 bg-[#378add]/20 p-2.5">
                <span className="text-base leading-none">⚖</span>
                <span className="text-[10px] font-medium text-[#85b7eb] sm:text-[11px]">Draft Contract</span>
                <span className="text-[9px] text-white/30 sm:text-[10px]">AI wizard</span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] p-2.5">
                <span className="text-base leading-none">🔮</span>
                <span className="text-[10px] font-medium text-white/80 sm:text-[11px]">Predict Outcome</span>
                <span className="text-[9px] text-white/30 sm:text-[10px]">Case analysis</span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg border border-white/[0.08] bg-white/[0.04] p-2.5">
                <span className="text-base leading-none">🔍</span>
                <span className="text-[10px] font-medium text-white/80 sm:text-[11px]">Legal Research</span>
                <span className="text-[9px] text-white/30 sm:text-[10px]">1379 articles</span>
              </div>
            </div>
          </div>

          {/* Feature usage + Recent activity */}
          <div className="grid grid-cols-1 gap-2 pb-0 sm:grid-cols-2">
            <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5 sm:p-3">
              <div className="mb-2 text-[10px] font-medium text-white/50 sm:text-[11px]">Feature usage</div>
              <svg viewBox="0 0 220 55" className="h-[55px] w-full" preserveAspectRatio="xMidYMid meet">
                <polyline
                  points="0,45 44,30 88,20 132,35 176,15 220,38 220,55 0,55"
                  fill="rgba(55,138,221,0.1)"
                  stroke="none"
                />
                <polyline
                  points="0,45 44,30 88,20 132,35 176,15 220,38"
                  fill="none"
                  stroke="#378add"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="176" cy="15" r="3" fill="#378add" />
              </svg>
              <div className="mt-1 flex justify-between text-[8px] text-white/25 sm:text-[9px]">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span className="text-white/35">Today</span>
              </div>
            </div>
            <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] p-2.5 sm:p-3">
              <div className="mb-2 text-[10px] font-medium text-white/50 sm:text-[11px]">Recent activity</div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#5dcaa5]" />
                  <span className="text-[9px] text-white/50 sm:text-[10px]">Service Agreement created</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#378add]" />
                  <span className="text-[9px] text-white/50 sm:text-[10px]">NDA · Serbia generated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#7f77dd]" />
                  <span className="text-[9px] text-white/50 sm:text-[10px]">Client Mario Markovic added</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#febc2e]" />
                  <span className="text-[9px] text-white/50 sm:text-[10px]">Deadline: Apr 29 approaching</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
