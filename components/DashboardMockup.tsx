import {
  Activity,
  BookTemplate,
  Briefcase,
  Calendar,
  Clock,
  CreditCard,
  FilePen,
  FileSearch,
  FileText,
  Inbox,
  LayoutDashboard,
  Scale,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"

function SidebarLink({
  icon: Icon,
  label,
  active = false,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded px-1.5 py-1 ${
        active ? "bg-white/[0.08] text-white/85" : "text-white/40"
      }`}
    >
      <Icon className="h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3" />
      <span className="truncate text-[7px] leading-tight sm:text-[8px]">{label}</span>
    </div>
  )
}

function SidebarSection({ label }: { label: string }) {
  return (
    <p className="px-1.5 py-1 text-[6px] uppercase tracking-widest text-white/25 sm:text-[7px]">
      {label}
    </p>
  )
}

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
        {/* Slim header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] bg-[#0a0e14] px-3 py-1.5 sm:px-4">
          <span className="shrink-0 text-[10px] font-medium text-white/90 sm:text-[12px]">
            ⚖ Legantis
          </span>
          <div className="flex items-center gap-2">
            <span className="rounded border border-white/10 px-1.5 py-0.5 text-[8px] text-white/40 sm:text-[9px]">
              EN
            </span>
            <div className="rounded-[10px] border border-[#639922]/40 bg-[#639922]/20 px-2 py-0.5 text-[8px] text-[#97c459] sm:text-[9px]">
              Firm plan
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <aside className="flex w-[88px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0a0e14] py-2 sm:w-[108px]">
            <nav className="flex flex-col gap-0.5 px-1.5">
              <SidebarLink icon={LayoutDashboard} label="Dashboard" active />
            </nav>

            <SidebarSection label="AI Tools" />
            <nav className="flex flex-col gap-0.5 px-1.5">
              <SidebarLink icon={Sparkles} label="Generate" />
              <SidebarLink icon={FilePen} label="Contracts" />
              <SidebarLink icon={Scale} label="Predictions" />
              <SidebarLink icon={FileSearch} label="Analyze" />
              <SidebarLink icon={FileText} label="Redline" />
              <SidebarLink icon={Search} label="Research" />
              <SidebarLink icon={ShieldAlert} label="Conflict" />
            </nav>

            <SidebarSection label="Management" />
            <nav className="flex flex-col gap-0.5 px-1.5">
              <SidebarLink icon={Users} label="Clients" />
              <SidebarLink icon={Briefcase} label="Matters" />
              <SidebarLink icon={Clock} label="Time" />
              <SidebarLink icon={Calendar} label="Deadlines" />
              <SidebarLink icon={Inbox} label="Intake" />
              <SidebarLink icon={BookTemplate} label="Templates" />
              <SidebarLink icon={Activity} label="Activity" />
            </nav>

            <nav className="mt-auto flex flex-col gap-0.5 border-t border-white/[0.07] px-1.5 pt-2">
              <SidebarLink icon={CreditCard} label="Billing" />
              <SidebarLink icon={Settings} label="Settings" />
            </nav>
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1 px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
            <div className="mb-1 text-[9px] uppercase tracking-[0.08em] text-white/30 sm:text-[10px]">
              Legantis Dashboard
            </div>
            <div className="mb-0.5 text-[15px] font-medium text-white/90 sm:text-[17px]">
              Welcome back
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
    </div>
  )
}
