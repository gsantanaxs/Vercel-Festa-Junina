const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');

router.get('/', async (req, res, next) => {
    try {

        const { data, error } = await supabase
            .from('ingressos')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;

        res.json(data);

    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {

        const { data, error } = await supabase
            .from('ingressos')
            .insert([req.body])
            .select();

        if (error) throw error;

        res.status(201).json({
            sucesso: true,
            mensagem: '🎟️ Ingresso reservado com sucesso!',
            ingresso: data[0]
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;