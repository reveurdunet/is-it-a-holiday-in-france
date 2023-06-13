import { useEffect, useState } from 'react';
import './App.css';
import Non from './pages/Non'
import Oui from './pages/Oui'

function compareDateAndMonth (date, actual) {
  if (date.getDate() === actual.getDate()
      && date.getMonth() === actual.getMonth())
      return 1
  return 0
}

function getDay(dates) {
  const actual = new Date()
  let date_object;
  for (let day in dates)
  {
    date_object = new Date(day)
    if (compareDateAndMonth(date_object, actual))
      return {day: dates[day]}
  }
  return {day: "non"}
}

export default function App() {

  const [data, setData] = useState({});
  const [resultdate, setResultDate] = useState({});

  useEffect(() => {
    const datafetch = async () => {
      const response = await fetch("https://calendrier.api.gouv.fr/jours-feries/metropole/2023.json")
      const json = await response.json()
      setData(json)
      setResultDate(getDay(json))
    }
    datafetch()
  }, []);

  if (resultdate.day === "non")
    return (
      <Non data={data}></Non>
    )
  else if (resultdate.day) {
    return (
      <Oui param={resultdate.day} data={data}></Oui>
    )
  }
  return (<h2>Loading...</h2>)
}
