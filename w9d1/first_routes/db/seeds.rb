# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


users = User.create ([ {username: 'Philippe'}, {username: 'Rapkat'}, {username: 'Andy'}, {username: 'Trevor'} ])

artworks = Artwork.create ([ {title: 'first painting', image_url: 'first_painting_url', artist_id: 1},
{title: 'second painting', image_url: 'second_painting_url', artist_id: 1},
{title: 'third painting', image_url: 'third_painting_url', artist_id: 1},
{title: 'fourth painting', image_url: 'fourth_painting_url', artist_id: 2},
{title: 'fifth painting', image_url: 'fifth_painting_url', artist_id: 2},
{title: 'sixth painting', image_url: 'sixth_painting_url', artist_id: 2},
{title: 'seventh painting', image_url: 'seventh_painting_url', artist_id: 3},
{title: 'eighth painting', image_url: 'eighth_painting_url', artist_id: 3},
{title: 'ninth painting', image_url: 'ninth_painting_url', artist_id: 3},
{title: 'tenth painting', image_url: 'tenth_painting_url', artist_id: 4},
{title: 'eleventh painting', image_url: 'eleventh_painting_url', artist_id: 4},
{title: 'twelfth painting', image_url: 'twelfth_painting_url', artist_id: 4} ])

artwork_shares = ArtworkShare.create ([ {artwork_id: 1, viewer_id: 4},
{artwork_id: 1, viewer_id: 3},
{artwork_id: 4, viewer_id: 1},
{artwork_id: 9, viewer_id: 1},
{artwork_id: 12, viewer_id: 1}]) 