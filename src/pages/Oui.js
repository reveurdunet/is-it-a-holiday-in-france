import style from './Oui.module.css'
import Next from './Next'

export default function Oui({param, data}) {
  return (
    <body className={style.body}>
      <header>
        <div className="text">
          <h2>
            is it a holiday in france ? 
          </h2>
          <h1>
            🎉{param}🎉
          </h1>
        </div>
      </header>
      <Next param={data}></Next>
    </body>
  )
}