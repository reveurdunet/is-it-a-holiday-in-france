import { useEffect, useState } from "react";

async function getInfo(param) {
  let expect = {};
  const response = await fetch("https://fr.wikipedia.org/api/rest_v1/page/summary/" + param)
  const json = await response.json()
  expect.description = json.extract
  expect.link = json?.content_urls?.desktop.page
  return expect
}

function LessDateAndMonth(date, actual) {
  if (date.getMonth() < actual.getMonth()
    || (date.getMonth() === actual.getMonth() && date.getDate() < actual.getDate()))
    return 1
  return 0
}

async function getDay(dates) {
  const list = []
  const actual = new Date()
  let date_object;
  for (let day in dates) {
    date_object = new Date(day)
    if (LessDateAndMonth(date_object, actual))
      continue;
    list.push({ name: dates[day], info: await getInfo(dates[day]) })
  }
  return list
}

export default function Next({ param }) {

  const [list, initList] = useState([])

  useEffect(() => {
    getDay(param).then((res) => initList(res))
  }, [param])

  return (
    <div className="wrapper">
      {list.map((obj) => {
        return (
          <a href={obj.info.link}>
            <div className="card">
              <h3>{obj.name}</h3>
              <p>{obj.info.description}</p>
            </div>
          </a>
        )
      })
      }
    </div>
  )
}