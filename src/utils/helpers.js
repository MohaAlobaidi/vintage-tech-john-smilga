import url from './URL'
//flattenProducts
export function flattenProducts(data){
    return data.map(item =>{
        //cloudinary
        //let image = item.image[0].url;
        //local setup no deployment
        let image =` ${item.image}` && `${url}${item.image[0].url}`||null
        return {...item,image}
    })
}


// helper functions
export function featuredProducts(data){

    return data.filter(item =>{
        return item.featured === true
    })

    
}