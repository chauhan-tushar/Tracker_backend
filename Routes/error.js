export default () => {
    process.on('unhandledRejection',(error, promiss) => {
        promiss.catch(error => {
            console.log(error);
        })
    });
}