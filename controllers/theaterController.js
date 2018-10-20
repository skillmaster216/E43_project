const controller = {}

controller.list = ( req, res) => {
    req.getConnection( (err, conn) => {
        conn.query('SELECT * FROM theater', (err, theaters) => {
            if( err){
                res.json(err)
            }
            res.render('theaters', {
                data: theaters
            })
        })
    })
}


controller.find = ( req, res) => {
    const {id} = req.params

    req.getConnection( (err, conn) => {
        conn.query( 'SELECT DISTINCT M.name FROM movie as M, theater_movie as T WHERE T.t_id = ? and M.movie_id = T.m_id', [id], (err, films) => {
            res.render('films', {
                data: films
            })
        })
    })
}

controller.save = (req, res) => {
	const data = req.body
	req.getConnection((err, conn) => {
		conn.query('INSERT INTO theater set ?', [data], (err, theater) => {
			res.redirect('/')
		})
	})
}

controller.average = ( req, res) => {
    req.getConnection( (err, conn) => {
        conn.query( 'select distinct t.name, avg(m_t.puntaje) over(PARTITION BY m_t.t_id) as score from  theater_movie as m_t, theater as t where m_t.t_id = t.theater_id;', (err, theaters) => {
            if( err){
                res.json(err)
            }
            res.render('average', {
                data: theaters
            })
        })
    })
}
module.exports = controller


/* select t.name, avg(m_t.puntaje) over(PARTITION BY m_t.t_id) from  theater_movie as m_t, theater as t where m_t.t_id = t.theater_id;*/