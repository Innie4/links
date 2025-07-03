const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const feedbackRouter = require('./routes/feedback');
const providersRouter = require('./routes/providers');
const searchSuggestionsRouter = require('./routes/searchSuggestions');
const adminStatsRouter = require('./routes/adminStats');

app.use('/api/feedback', feedbackRouter);
app.use('/api/providers', providersRouter);
app.use('/api/search/suggestions', searchSuggestionsRouter);
app.use('/api/admin/stats', adminStatsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
}); 