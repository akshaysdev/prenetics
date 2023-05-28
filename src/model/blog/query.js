const fetchBlogsQuery = ({ limit, pageNumber, userId }) => {
  const query = [];

  if (userId) {
    query.push({ $match: { authorId: userId } });
  }

  const skip = pageNumber - 1 ? (pageNumber - 1) * limit : 0;

  query.push(
    ...[
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $facet: {
          total: [
            {
              $count: 'count',
            },
          ],
          data: [
            {
              $addFields: {
                _id: '$_id',
              },
            },
          ],
        },
      },
      {
        $unwind: '$total',
      },
      {
        $project: {
          blogs: {
            $slice: [
              '$data',
              skip,
              {
                $ifNull: [limit, '$total.count'],
              },
            ],
          },
          pageNumber: {
            $literal: pageNumber,
          },
          hasNextPage: {
            $lt: [limit * pageNumber, '$total.count'],
          },
          totalPages: {
            $ceil: {
              $divide: ['$total.count', limit],
            },
          },
          total: '$total.count',
        },
      },
    ]
  );

  return query;
};

module.exports = { fetchBlogsQuery };
