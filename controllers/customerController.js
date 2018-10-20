const controller = {}

controller.profile = ( req, res) => {
    const {id} = req.params
    req.getConnection( (err, conn) => {
        conn.query( 'SELECT * FROM customer where id = ?', [id], (err, customer) => {
            res.render('customer_profile', {
                data: customer[0]
            })
        })
    })
}


controller.save = (req, res) => {
	const data = req.body
	req.getConnection((err, conn) => {
		conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
            if(err){
                res.json(err)
            }
			res.redirect('/')
		})
	})
}

module.exports = controller