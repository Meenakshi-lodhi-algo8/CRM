/*
    Author: Meenakshi
    Dated: 2023-04-03
    Script Name: CRUD APIs for roles
    Script Description: This methods are used to create new role , fetch the data of paricular role by company id , update role data and delete role..
                        
*/

const Roles = require("../../Models/CompaniesManagement/rolesModel");
const Company_Auth = require("../../Models/CompaniesManagement/companyAuthModel");

const createRole = async (req, res) => {
  try {
    const company = await Company_Auth.findById(req.params.companyid);
    if (company) {
      const { role_name, role_type, listing_permissions } = req.body;

      const newRole = await Roles.create({
        company: req.params.companyid,
        role_name: role_name,
        role_type: role_type,
        listing_permissions: listing_permissions,
      });
      return res.status(201).send({
        status: true,
        message: "new role is created Sucessfully",
        data: newRole,
      });
    } else {
      return res.status(400).json({
        message: "COmpnay id is not correct.",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getRolesByCompanyId = async (req, res) => {
  try {
    const companyId = req.params.companyid;
    const roles = await Roles.find({ company: companyId });

    if (roles.length === 0) {
      return res.status(404).json({
        message: "No roles found for the given company ID.",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Roles fetched successfully",
      data: roles,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateRole = async (req, res) => {
  try {
    const role = await Roles.findById(req.params.roleid);
    if (role) {
      const { role_name, role_type, listing_permissions } = req.body;

      const updatedRole = await Roles.findByIdAndUpdate(
        req.params.roleid,
        {
          role_name: role_name,
          role_type: role_type,
          listing_permissions: listing_permissions,
        },
        { new: true }
      );

      return res.status(200).send({
        status: true,
        message: "Role updated successfully",
        data: updatedRole,
      });
    } else {
      return res.status(400).json({
        message: "Role id is not correct.",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteRole = async (req, res) => {
  try {
    const role = await Roles.findById(req.params.roleid);
    if (role) {
      await Roles.findByIdAndDelete(req.params.roleid);
      return res.status(200).send({
        status: true,
        message: "Role deleted successfully",
        data: null,
      });
    } else {
      return res.status(400).json({
        message: "Role id is not correct.",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createRole, getRolesByCompanyId, updateRole, deleteRole };
