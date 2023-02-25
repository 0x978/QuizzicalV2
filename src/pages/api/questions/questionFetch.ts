export default function questionhandler(req,res){
    fetch("https://opentdb.com/api.php?amount=10")
        .then((response) => response.json())
        .then((data) => res.status(200).json({
            success:1,
            data:data
        }))
        .catch(err =>{
            res.status(400).json({
                success:0,
                error:err
            })
        })
}