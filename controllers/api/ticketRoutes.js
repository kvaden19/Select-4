const router = require('express').Router();
const { Ticket } = require('../../models');

// Route: POST /api/tickets/
// Allows user to create a new ticket
router.post('/', async (req, res) => {
    try {
        const ticketData = await Ticket.create(req.body);
        res.status(200).json(ticketData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route: GET /api/tickets/
// Allows user to view tickets in their wallet
// TODO: Connect to front-end Wallet component
// TODO: Add WHERE clause: logged-in user and current date
router.get('/', async (req, res) => {
    try {
        const ticketData = await Ticket.findAll();
        res.status(200).json(ticketData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;