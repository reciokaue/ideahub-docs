import docs from './docs.json'


function test(){
  let size = 0
  docs.forEach(doc => {
    size+= doc.content.length
  })
  console.log(size/docs.length)
}
test()