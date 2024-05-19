import { PropsWithChildren } from 'react'
import './layout.css'

export const Layout =  ({ children }: PropsWithChildren) => {
  return (
    <section className='layout'>{children}</section>
  )
}
