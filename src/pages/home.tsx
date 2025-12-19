import CountdownBlock from '../components/countdown-block'
import EventBlock from '../components/event-block'
import HeatmapBlock from '../components/heatmap-block'
import StatBlock from '../components/stat-block'
import TimerBlock from './../components/timer-block'
import TodoBlock from '../components/todo-block'
import './home.css'

function HomePage() {
  return (
    <div id='homePage'>
      <TimerBlock  />
      <EventBlock />
      <TodoBlock />
      <CountdownBlock />
      <StatBlock />
      <HeatmapBlock />
    </div>
  )
}

export default HomePage
