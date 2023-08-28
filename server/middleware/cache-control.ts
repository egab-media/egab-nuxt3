export default defineEventHandler((event) => {
  const res = event.node.res
  const year = 31536000
  const hour = 60 * 60
  const url = event.node.req.url!
  const maxage = url.match(/(.+)\.(jpg|jpeg|gif|css|png|js|ico|svg|mjs|woff2)/) ? year : hour
  res.setHeader('Cache-Control', `max-age=${maxage} s-maxage=${maxage}`)
})
