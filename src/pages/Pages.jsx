import { useMemo, useState } from 'react'
import committee from '../data/committee.json'
import notices from '../data/notices.json'
import { competitions, eventArchive, resources, selectedTeamSteps, sources, trainingModules } from '../data/siteData'
import { Badge, Callout, DemoNote, NoticeRow, PageHero, SectionHeading, TextLink } from '../components/Primitives'
import { Icon } from '../components/Icon'
import { RouterLink } from '../components/RouterLink'

function FacultyPortrait({ person }) {
  if (person.image) return <img className="faculty-portrait" src={person.image} alt={person.imageAlt} />
  const initials = person.name.split(' ').filter((part) => !part.includes('Dr')).slice(-2).map((part) => part[0]).join('')
  return <div className="faculty-portrait faculty-portrait--placeholder" role="img" aria-label={`Approved portrait pending for ${person.name}`}><span>{initials}</span><small>Approved portrait pending</small></div>
}

function ArchiveCard({ event, featured = false }) {
  return (
    <article className={`archive-card ${featured ? 'archive-card--featured' : ''}`}>
      <div className="archive-card__media">
        {event.image ? <img src={event.image} alt={event.imageAlt} loading="lazy" /> : <div className="archive-card__fallback"><img src="/assets/panjab-university-seal.png" alt="" /><span>Archive record</span></div>}
        <span className="archive-card__year">{event.year}</span>
      </div>
      <div className="archive-card__body">
        <p className="eyebrow">{event.date}</p>
        <h3>{event.title}</h3>
        <p>{event.summary}</p>
        <div className="archive-card__details">
          <div><span>Record</span>{event.facts.map((fact) => <p key={fact}>{fact}</p>)}</div>
          <div><span>{event.peopleNote}</span>{event.guests.map((guest) => <p key={guest}>{guest}</p>)}</div>
        </div>
        <a className="source-button" href={event.href} target="_blank" rel="noreferrer">{event.source}<Icon name="external" size={14} /></a>
      </div>
    </article>
  )
}

export function HomePage() {
  const homeNotices = notices.filter((notice) => notice.featured || notice.status === 'Prototype').slice(0, 3)
  const latest = eventArchive[0]
  return (
    <>
      <section className="home-hero home-hero--editorial">
        <div className="shell home-hero__layout">
          <div className="home-hero__copy">
            <p className="institution-line">University Institute of Legal Studies · Panjab University</p>
            <h1>Moot Court<br />Society</h1>
            <p className="home-hero__statement">A student body for disciplined legal research, written advocacy and courtroom practice.</p>
            <div className="hero-actions">
              <RouterLink className="button button--primary" href="/competitions">Competitions and archive <Icon name="arrow" size={16} /></RouterLink>
              <RouterLink className="button button--secondary" href="/notices">Important updates</RouterLink>
            </div>
          </div>
          <div className="home-hero__photograph">
            <img src="/assets/satish-narang-gallery-1.png" alt="Final round panel at the Satish Chander Narang Intra Moot 2025" />
            <div className="photo-caption"><span>From the archive</span><p>First Sh. Satish Chander Narang Intra Moot · November 2025</p></div>
          </div>
        </div>
        <div className="shell home-hero__foot">
          <div><strong>32</strong><span>student members</span></div>
          <div><strong>2026–27</strong><span>current tenure</span></div>
          <div className="home-hero__notice"><Icon name="shield" size={16} /><span>Working prototype · Official UILS and MCS notifications prevail</span></div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="shell latest-story">
          <div className="latest-story__heading"><p className="eyebrow">Latest documented MCS event</p><span>{latest.year}</span></div>
          <div className="latest-story__content">
            <h2>{latest.title}</h2><p>{latest.summary}</p>
            <div className="guest-line"><span>Final bench</span>{latest.guests.map((guest) => <p key={guest}>{guest}</p>)}</div>
            <TextLink href={latest.href}>Read the published report</TextLink>
          </div>
          <img src="/assets/lex-novus-2026.webp" alt="Lex Novus 2026 event photograph" />
        </div>
      </section>

      <section className="section section--wash">
        <div className="shell">
          <SectionHeading eyebrow="Current desk" title="Notices and useful links" text="Official sources come first. Draft material is identified as prototype content." action={<TextLink href="/notices">All notices</TextLink>} />
          <div className="notice-list">{homeNotices.map((notice) => <NoticeRow key={notice.id} notice={notice} />)}</div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="shell practice-index">
          <div><p className="eyebrow">The practice</p><h2>Read closely.<br />Write clearly.<br />Answer directly.</h2></div>
          <div className="practice-index__links">
            <RouterLink href="/training"><span>01</span><div><h3>Training and mentorship</h3><p>Research, memorials and oral rounds</p></div><Icon name="arrow" size={18} /></RouterLink>
            <RouterLink href="/resources"><span>02</span><div><h3>Resource desk</h3><p>Reliable starting points and working checks</p></div><Icon name="arrow" size={18} /></RouterLink>
            <RouterLink href="/selected-teams"><span>03</span><div><h3>Selected teams</h3><p>Representation, deadlines and approvals</p></div><Icon name="arrow" size={18} /></RouterLink>
          </div>
        </div>
      </section>
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <PageHero index="01" eyebrow="About MCS" title="A forum for rigorous and ethical advocacy" intro="MCS supports practical legal education through internal and national competitions, orientation, research, memorial writing and oral advocacy." aside={<div className="hero-aside-stat"><strong>32</strong><span>student members from the second to fifth year</span></div>} />
      <section className="section section--paper"><div className="shell editorial-grid"><div><p className="eyebrow">Official description</p><h2>Learning law by making the argument</h2></div><div className="prose-large"><p>The Society is a 32 member student committee. Its public profile describes a competitive mooting environment supported by training sessions and intra department competitions.</p><p>UILS also identifies an annual mandate that includes an intra department moot, trial advocacy and two national moots. The work connects close research with clear writing, responsive oral submissions and professional conduct.</p><a className="source-line" href="https://www.uils.puchd.ac.in/centres-societies-cells.php" target="_blank" rel="noreferrer">Official UILS societies page <Icon name="external" size={14} /></a></div></div></section>
      <section className="section section--wash"><div className="shell"><SectionHeading eyebrow="What the Society develops" title="Three parts of one discipline" /><div className="pillar-grid">{[['Research','Find the governing text, trace controlling authority and record the source trail.'],['Written advocacy','Build a coherent theory and express it with economy, accuracy and proper citation.'],['Oral advocacy','Listen to the bench, answer the question asked and return to the decisive point.']].map(([title,text],index)=><article className="pillar-card" key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
      <section className="section section--paper"><div className="shell facts-layout"><div><p className="eyebrow">Institutional setting</p><h2>Part of the UILS tradition of experiential legal education</h2><p>UILS was established in the 2004–05 academic session. The Institute identifies drafting, research, advocacy, interviewing and negotiation as central professional skills and maintains a dedicated Moot Court Hall.</p><TextLink href="https://www.uils.puchd.ac.in/">Official UILS website</TextLink></div><div className="fact-list"><div><span>2004–05</span><p>UILS established</p></div><div><span>32</span><p>MCS student members</p></div><div><span>03</span><p>Student office bearer roles</p></div></div></div></section>
      <Callout eyebrow="Governance" title="Faculty guidance and student responsibility" text="The current faculty leadership and previous MCS faculty record are preserved together." href="/committee" label="View the committee" />
    </>
  )
}

export function CommitteePage() {
  return (
    <>
      <PageHero index="02" eyebrow="Committee · 2026–27" title="Stewardship with a clear line of responsibility" intro="The Society combines faculty oversight with a 32 member student committee drawn from the second to fifth year." aside={<div className="hero-aside-stat"><strong>32</strong><span>members in the published MCS structure</span></div>} />
      <section className="section section--paper"><div className="shell"><SectionHeading eyebrow="Faculty leadership" title="Faculty In-Charges for 2026–27" text="Current tenure details were supplied for this working prototype. Published academic information is linked where available." /><div className="faculty-grid">{committee.faculty.map((person)=><article className="faculty-profile-card" key={person.name}><FacultyPortrait person={person}/><div className="faculty-profile-card__body"><Badge tone="official">Current tenure</Badge><h3>{person.name}</h3><p className="faculty-role">{person.role}</p><dl><div><dt>Position</dt><dd>{person.designation}</dd></div><div><dt>Academic record</dt><dd>{person.qualifications}</dd></div><div><dt>Focus</dt><dd>{person.expertise}</dd></div></dl><a href={person.profile} target="_blank" rel="noreferrer" className="profile-source">Published source <Icon name="external" size={14}/></a></div></article>)}</div></div></section>
      <section className="section section--wash"><div className="shell"><SectionHeading eyebrow="Continuity of service" title="Previously listed Faculty In-Charges" text="Earlier names remain here as an institutional record and are not presented as the current tenure." /><div className="previous-faculty-grid">{committee.previousFaculty.map((person)=><article className="previous-faculty-card" key={person.name}><FacultyPortrait person={person}/><div className="previous-faculty-card__body"><Badge>Previous listing</Badge><h3>{person.name}</h3><p className="faculty-role">{person.designation}</p><p>{person.service}</p><a href={person.profile} target="_blank" rel="noreferrer" className="profile-source">Published source <Icon name="external" size={14}/></a></div></article>)}</div><p className="portrait-note">Only photographs supported by a university profile or published competition material are displayed. Other portraits remain pending approval.</p></div></section>
      <section className="section section--paper"><div className="shell"><SectionHeading eyebrow="Student committee" title="A 32 member working body" text="The public MCS profile records students from the second to fifth year. UILS describes three office bearer roles." /><DemoNote>The 2026–27 student roster remains unassigned until an approved list is provided.</DemoNote><div className="leadership-grid">{committee.studentLeadership.map((person,index)=><article className="leadership-card" key={person.role}><span>0{index+1}</span><p>{person.role}</p><h3>{person.name}</h3></article>)}</div></div></section>
    </>
  )
}

export function CompetitionsPage() {
  return (
    <>
      <PageHero index="03" eyebrow="Competitions and archive" title="The Society in practice" intro="A documented record of internal and national competitions, judging panels and the people who shaped recent MCS programmes." aside={<div className="hero-aside-mark"><Icon name="scale" size={32}/><span>Programmes<br/>People<br/>Record</span></div>} />
      <section className="section section--paper"><div className="shell"><SectionHeading eyebrow="Competition portfolio" title="Programmes connected with MCS" text="Each entry links to the official description, published rules, brochure or event report supporting it." /><div className="competition-grid">{competitions.map((competition)=><article className="competition-card" key={competition.title}>{competition.image?<img src={competition.image} alt={competition.imageAlt} loading="lazy"/>:<div className="competition-card__monogram"><span>MCS</span></div>}<div className="competition-card__body"><p className="eyebrow">{competition.type}</p><h3>{competition.title}</h3><p>{competition.description}</p><div className="competition-card__meta"><Badge tone={competition.verification.includes('Official')?'official':'neutral'}>{competition.verification}</Badge><span>{competition.status}</span></div><a href={competition.href} target="_blank" rel="noreferrer" className="source-button">View source <Icon name="external" size={14}/></a></div></article>)}</div></div></section>
      <section className="section section--archive"><div className="shell"><SectionHeading eyebrow="Archive" title="Recent rounds and distinguished benches" text="This record uses public reporting and competition material. Photographs retain their source context and link back to the published report." /><div className="archive-list">{eventArchive.map((event,index)=><ArchiveCard key={`${event.year}-${event.title}`} event={event} featured={index===0}/>)}</div></div></section>
      <section className="section section--paper"><div className="shell process-layout"><div className="process-intro"><p className="eyebrow">Allocation pathway · prototype</p><h2>A sequence students can prepare for</h2><p>The applicable MCS notice always controls eligibility, assessment and allocation.</p><Badge tone="demo">Illustrative process</Badge></div><ol className="process-list">{[['Read the notice','Confirm eligibility, dates and conflict rules.'],['Complete the assessment','Follow the stated research, writing or oral task.'],['Attend eliminations','Present within time and respond to the bench.'],['Confirm the team','Record roles and disclose scheduling conflicts.'],['Receive approval','Representation begins only after written confirmation.']].map(([title,text],index)=><li key={title}><span>0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
      <Callout eyebrow="Selected teams" title="Representation begins with careful administration" text="Use the team guide for correspondence, deadlines, approvals and the shared competition record." href="/selected-teams" label="Open team guidance" />
    </>
  )
}

export function ResourcesPage() {
  const researchSteps = [['Read the record','Prepare a chronology, party map and relief map.'],['Frame neutral issues','Write questions the court can answer.'],['Begin with governing text','Identify the controlling statute, rule, treaty or constitutional provision.'],['Trace authority','Prioritise controlling courts and verify later treatment.'],['Keep a source log','Record the proposition, pinpoint, court, date and link.'],['Test the other side','Find the strongest contrary authority and answer it.']]
  return (
    <><PageHero index="04" eyebrow="Resource desk" title="Work from sources and build the argument" intro="A compact starting point for research, memorial review and practice preparation. Competition rules and faculty directions remain controlling." aside={<div className="hero-aside-mark"><Icon name="book" size={32}/><span>Find<br/>Test<br/>Cite</span></div>}/><section className="section section--paper"><div className="shell"><SectionHeading eyebrow="Research access" title="A small and dependable toolset" text="Official and university sources appear before prototype working guides."/><div className="resource-grid">{resources.map((resource)=><RouterLink href={resource.href} className="resource-card" key={resource.title}><div><p className="eyebrow">{resource.kind}</p><h3>{resource.title}</h3><p>{resource.text}</p></div><span>{resource.external?'Open source':'Use checklist'} <Icon name={resource.external?'external':'arrow'} size={15}/></span></RouterLink>)}</div></div></section><section className="section section--wash" id="research-checklist"><div className="shell checklist-layout"><div className="sticky-heading"><p className="eyebrow">Prototype working guide</p><h2>The research trail</h2><p>A repeatable route from proposition to defensible submission.</p></div><ol className="checklist">{researchSteps.map(([title,text],index)=><li key={title}><span>0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section><section className="section section--paper" id="memorial-checklist"><div className="shell"><SectionHeading eyebrow="Before submission" title="The memorial review" text="Use the competition rules for exact page limits, citations, anonymity and file naming."/><div className="review-grid">{[['Rules','Every mandatory section and current amendment is accounted for.'],['Record','Every factual statement is accurate and supportable.'],['Authority','Every case supports the proposition attached to it.'],['Argument','Every issue moves from rule to application and conclusion.'],['Form','Headings, citations, pagination and defined terms are consistent.'],['Proof','Separate readers complete source and language reviews.']].map(([title,text])=><article key={title}><span></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section></>
  )
}

export function TrainingPage() {
  return (
    <><PageHero index="05" eyebrow="Training and mentorship" title="Train the method" intro="A proposed programme for research judgment, written structure and oral responsiveness through short and repeatable sessions." aside={<Badge tone="demo">Proposed programme</Badge>}/><section className="section section--paper"><div className="shell"><DemoNote>Dates, mentors, eligibility and attendance requirements need MCS approval before announcement.</DemoNote><div className="module-list">{trainingModules.map((module)=><article className="module-row" key={module.number}><span className="module-row__number">{module.number}</span><div><p className="eyebrow">Core module</p><h2>{module.title}</h2></div><p>{module.text}</p><span className="module-row__duration"><Icon name="clock" size={15}/>{module.duration}</span></article>)}</div></div></section><section className="section section--ink"><div className="shell mentorship-grid"><div><p className="eyebrow">Mentorship model</p><h2>Feedback specific enough to use</h2></div><div className="mentorship-steps">{[['Before','Share the side, issue, time and skill under review.'],['During','Record questions, authority use, structure, pace and time.'],['After','Agree two changes and test them in the next round.']].map(([title,text],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section></>
  )
}

export function SelectedTeamsPage() {
  return (
    <><PageHero index="06" eyebrow="Guidance for selected teams" title="Represent the institution with care" intro="A practical handover for students who have received written confirmation to represent UILS." aside={<div className="hero-aside-mark"><Icon name="shield" size={32}/><span>Confirm<br/>Prepare<br/>Report</span></div>}/><section className="section section--paper"><div className="shell"><DemoNote>This guidance does not create an allocation, reimbursement entitlement, leave permission or institutional approval.</DemoNote><div className="selected-layout"><div className="selected-intro"><p className="eyebrow">The first 48 hours</p><h2>Five actions after selection</h2><p>Early administrative discipline protects the team from avoidable failures.</p></div><ol className="selected-steps">{selectedTeamSteps.map((step,index)=><li key={step.title}><span>0{index+1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div></div></section><section className="section section--wash"><div className="shell"><SectionHeading eyebrow="Team workspace" title="One folder and one source of truth"/><div className="folder-grid">{[['01 Admin','Rules, approvals, registration, correspondence and travel.'],['02 Proposition','Problem, corrections, clarifications and chronology.'],['03 Research','Issue folders, authorities and source log.'],['04 Memorial','Drafts, review copies and final submission.'],['05 Orals','Roadmaps, compendium, questions and practice log.'],['06 Report','Results, proof of participation and closing note.']].map(([title,text])=><article key={title}><Icon name="file" size={19}/><h3>{title}</h3><p>{text}</p></article>)}</div></div></section><Callout eyebrow="Controlling information" title="Return to the official notice before every deadline" text="Rules and dates can change. The allocation communication and competition rulebook govern the team." href="/notices" label="Check notices"/></>
  )
}

export function NoticesPage() {
  const [query,setQuery]=useState('')
  const [filter,setFilter]=useState('All')
  const filters=['All','Official','Prototype']
  const visibleNotices=useMemo(()=>notices.filter((notice)=>{const matches=filter==='All'||(filter==='Official'?notice.status!=='Prototype':notice.status==='Prototype'); const haystack=`${notice.title} ${notice.summary} ${notice.category}`.toLowerCase(); return matches&&haystack.includes(query.toLowerCase())}),[filter,query])
  return (
    <><PageHero index="07" eyebrow="Notices and important updates" title="Check the source and check the date" intro="Official university sources are linked directly. Proposed material carries a visible prototype label and is never a notification." aside={<div className="hero-aside-mark"><Icon name="calendar" size={32}/><span>Official links<br/>Clear status</span></div>}/><section className="section section--paper"><div className="shell"><div className="notice-controls"><div className="search-field"><Icon name="search" size={17}/><label className="sr-only" htmlFor="notice-search">Search notices</label><input id="notice-search" value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search notices"/></div><div className="filter-buttons" aria-label="Filter notices">{filters.map((item)=><button key={item} type="button" className={filter===item?'active':''} onClick={()=>setFilter(item)}>{item}</button>)}</div></div><div className="notice-priority"><Icon name="shield" size={18}/><p><strong>Priority rule</strong> Follow the official notice, rulebook, email or faculty direction whenever it differs from this prototype.</p></div><div className="notice-list">{visibleNotices.map((notice)=><NoticeRow key={notice.id} notice={notice}/>)}{!visibleNotices.length&&<div className="empty-state"><h3>No matching notices</h3><p>Try another keyword or reset the filter.</p></div>}</div></div></section><section className="section section--wash"><div className="shell sources-layout"><div><p className="eyebrow">Research ledger</p><h2>Sources behind the prototype</h2><p>Future editors can distinguish university records, public reporting and prototype guidance.</p></div><div className="source-list">{sources.map((source,index)=><a key={source.href} href={source.href} target="_blank" rel="noreferrer"><span>{String(index+1).padStart(2,'0')}</span>{source.label}<Icon name="external" size={14}/></a>)}</div></div></section></>
  )
}

export function NotFoundPage(){return <section className="not-found shell"><span>404</span><p className="eyebrow">Page not found</p><h1>The argument ends here</h1><p>The requested page does not exist in this prototype.</p><RouterLink className="button button--primary" href="/">Return home <Icon name="arrow" size={16}/></RouterLink></section>}
