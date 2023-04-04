/*
    Author: Meenakshi
    Dated: 2023-04-03
    Script Name: get , update and delete APIs for Team
    Script Description: This methods are used to fetch the data of paricular team by company id , update team data and delete team..
      */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const logger = require('../../Logger/dev-logger');
const mongoose = require('mongoose');

const CompanyProfiles = require('../../Models/CompaniesManagement/companiesProfileModel');
const Company_Auth = require('../../Models/CompaniesManagement/companyAuthModel');
const User_Auth = require('../../Models/CompaniesManagement/userAuthModel');
const Teams = require('../../Models/CompaniesManagement/teamsModel');

const createTeam = asyncHandler(async(req,res) => {
    const id = req.params.companyid;
    const { team_name, description, team_leader, members } = req.body;

    if(!team_name) return res.status(400).json({message: 'Enter team name.'})

    const company = await Company_Auth.findById(id);
    if(company === null || company === undefined){
        return res.status(400).json({
            message: 'Company not exists in DB.'
        });
    }else{
        const team = await Teams.findOne({
            team_name: team_name, 
            company: id,
        });

        if(team === null || team === undefined){
            const createTeam = await Teams.create({
                team_name: team_name,
                company: id,
                description: description
            });
            
            console.log(createTeam);
            const team_lead = await User_Auth.findByIdAndUpdate(team_leader, {
                team: createTeam.id,
                team_leader: true
            })

            var result = [];
            for( var member of members ){
                const allotTeam = await User_Auth.findByIdAndUpdate(member, {
                    team: createTeam.id
                });
                result.push(allotTeam);
            }

            return res.status(201).json({
                message: 'Team created successfully and members added.',
                result: createTeam
            });
        }else{
            return res.status(400).json({
                message: 'Team already exists. Create a new team with different name.'
            });
            // const updateTeam = await Teams.findOneAndUpdate({company: id, team_name: team_name}, {
            //     team_name: team_name,
            //     description: description
            // });

            // return res.status(200).json({
            //     message: 'Team updated successfully.',
            //     result: updateTeam
            // });
        }
    }
});

const allotTeamsToUser = asyncHandler(async (req,res) => {
    const id = req.params.companyid;
    const { team_name, members } = req.body;
    const team = await Teams.findOne({
        team_name: team_name, 
        company: id,
    });

    if(team){
        var result = [];
        for( var member of members ){
            const allotTeam = await User_Auth.findByIdAndUpdate(member, {
                team: team.id
            });
            result.push(allotTeam);
        }

        return res.status(200).json({
            message: 'Members added to the team.',
            result: result
        });
    }else{
        return res.status(400).json({
            message: 'Team does not exist.'
        });
    }
});

const getTeamDetails = asyncHandler(async(req, res) => {
    const id = req.params.teamid;
    try {
      const team = await Teams.findById(id)
      if(!team) {
        return res.status(404).json({
          message: 'Team not found.'
        });
      }
      return res.status(200).json(team);
    } catch (err) {
      return res.status(500).json({
        message: 'Server error.',
        error: err.message
      });
    }
  });
  
  const updateTeamDetails = asyncHandler(async(req, res) => {
    const id = req.params.teamid;
    const { team_name, description, team_leader, members } = req.body;
    try {
      const team = await Teams.findById(id);
      if(!team) {
        return res.status(404).json({
          message: 'Team not found.'
        });
      }
      if(team_name) team.team_name = team_name;
      if(description) team.description = description;
      if(team_leader) team.team_leader = team_leader;
      if(members) team.members = members;
      await team.save();
      return res.status(200).json({
        message: 'Team details updated successfully.',
        result: team
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Server error.',
        error: err.message
      });
    }
  });
  
  const deleteTeam = asyncHandler(async(req, res) => {
    const id = req.params.teamid;
    try {
      const team = await Teams.findByIdAndDelete(id);
      if(!team) {
        return res.status(404).json({
          message: 'Team not found.'
        });
      }
      return res.status(200).json({
        message: 'Team deleted successfully.',
        result: team
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Server error.',
        error: err.message
      });
    }
  });
  

module.exports = { createTeam, allotTeamsToUser, getTeamDetails, updateTeamDetails, deleteTeam }