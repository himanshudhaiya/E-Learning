const Feed = require('../../models/Feed');
const Job = require('../../models/Job');
const Subject = require('../../models/Subject');
const Course = require('../../models/Course');
const College = require('../../models/College');
const University = require('../../models/University');
const User = require('../../models/User');


class SearchController {
    static search = async (req, res) => {
        try {
            let searchText = req.body.searchText; 
            let searchResults = await Promise.all([
                Feed.find({title: {$regex: searchText, $options: 'i'}}),
                Job.find({job_name: {$regex: searchText, $options: 'i'}}), 
                Subject.find({title: {$regex: searchText, $options: 'i'}}),
                Course.find({$or: [
                    {course_name: {$regex: searchText, $options: 'i'}},
                    {course_type: {$regex: searchText, $options: 'i'}},
                ]}),
                College.find({name: {$regex: searchText, $options: 'i'}}),
                University.find({name: {$regex: searchText, $options: 'i'}},),

            ]);
            res.status(200).json({
                message: 'Search results',
                status: true,
                success: true,
                data: searchResults
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

}

module.exports =  SearchController;