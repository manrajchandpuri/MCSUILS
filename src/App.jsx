import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import {
  AboutPage,
  CommitteePage,
  CompetitionsPage,
  HomePage,
  NoticesPage,
  NotFoundPage,
  ResourcesPage,
  SelectedTeamsPage,
  TrainingPage,
} from './pages/Pages'

const routes = {
  '/': { title: 'Moot Court Society · UILS', component: HomePage },
  '/about': { title: 'About MCS · UILS', component: AboutPage },
  '/committee': { title: 'Committee 2026–27 · MCS UILS', component: CommitteePage },
  '/competitions': { title: 'Competitions & Eliminations · MCS UILS', component: CompetitionsPage },
  '/resources': { title: 'Resources · MCS UILS', component: ResourcesPage },
  '/training': { title: 'Training & Mentorship · MCS UILS', component: TrainingPage },
  '/selected-teams': { title: 'Guidance for Selected Teams · MCS UILS', component: SelectedTeamsPage },
  '/notices': { title: 'Notices & Updates · MCS UILS', component: NoticesPage },
}

function normalisePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1)
  return pathname
}

export default function App() {
  const [path, setPath] = useState(() => normalisePath(window.location.pathname))

  useEffect(() => {
    const handleRoute = () => {
      setPath(normalisePath(window.location.pathname))
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('popstate', handleRoute)
    return () => window.removeEventListener('popstate', handleRoute)
  }, [])

  const route = routes[path]
  const Page = route?.component || NotFoundPage

  useEffect(() => {
    document.title = route?.title || 'Page not found · MCS UILS'
  }, [route])

  return <Layout path={path}><Page /></Layout>
}
