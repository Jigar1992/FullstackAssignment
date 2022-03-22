using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {

        MyDbContext dbcontext = new MyDbContext();
        private Response responseData = new Response();

        [HttpPost]
        [Route("GetAllModel")]
        public async Task<IActionResult> GetAllModel(Model model)
        {
            responseData = new Response();
            try
            {
                if (model.Id > 0)
                {
                    var getModel = dbcontext.Model
                                      .Where(x => x.Id == model.Id)
                                      .FirstOrDefault();

                    getModel.ManufacturerList = dbcontext.Manufacturer.ToList();

                    return Ok(getModel);
                }
                else
                {
                    var getModel = dbcontext.Model.Include(x => x.Manufacturer).ToList();

                    return Ok(getModel);

                }
            }
            catch (Exception ex)
            {
                responseData.success = false;
                responseData.message = ex.Message != null ? ex.Message.ToString() : "server error";
                return Ok(responseData);
            }
        }


        [HttpPost]
        [Route("SaveModel")]
        public async Task<IActionResult> SaveModel(Model model)
        {
            try
            {
                
                responseData = new Response();

                if (model.Id > 0)
                {
                    var checkModel = dbcontext.Model.Where(x => x.Id != model.Id && x.ModelName.ToLower() == model.ModelName.ToLower()).ToList();

                    if (checkModel != null && checkModel.Count > 0)
                    {
                        responseData.success = false;
                        responseData.message = "Model Name is already exist!";
                        responseData.code = 500;
                        return Ok(responseData);
                    }

                    var getModel = dbcontext.Model.Where(x => x.Id == model.Id).FirstOrDefault();

                    if (getModel != null)
                    {

                        getModel.ModelName = model.ModelName;
                        getModel.ManufacturerId = model.ManufacturerId;
                        getModel.FirstProductionDate = model.FirstProductionDate;
                        dbcontext.SaveChanges();
                    }
                }
                else
                {
                    var checkModelName = dbcontext.Model.Where(x => x.ModelName.ToLower() == model.ModelName.ToLower()).ToList();

                    if (checkModelName != null && checkModelName.Count > 0)
                    {
                        responseData.success = false;
                        responseData.message = "Model Name is already exist!";
                        responseData.code = 500;
                        return Ok(responseData);
                    }


                    Model tblModel = new Model();
                    tblModel.ModelName = model.ModelName;
                    tblModel.ManufacturerId = model.ManufacturerId;
                    tblModel.FirstProductionDate = model.FirstProductionDate;
                    dbcontext.Model.Add(tblModel);
                    dbcontext.SaveChanges();
                }

                responseData.success = true;
                responseData.message = "Model Saved Successfully";
                responseData.code = 200;

                return Ok(responseData);
            }
            catch (Exception ex)
            {
                responseData.success = false;
                responseData.message = ex.Message != null ? ex.Message.ToString() : "server error";
                return Ok(responseData);
            }
        }

        [HttpPost]
        [Route("DeleteModel")]
        public async Task<IActionResult> DeleteModel(Model model)
        {
            responseData = new Response();
            try
            {
                if (model.Id > 0)
                {
                  
                    responseData = new Response();
                    var itemToRemove = dbcontext.Model.SingleOrDefault(x => x.Id == model.Id);

                    if (itemToRemove != null)
                    {
                        dbcontext.Model.Remove(itemToRemove);
                        dbcontext.SaveChanges();
                    }

                }

                responseData.success = true;
                responseData.message = "Model remove successfully";
                responseData.code = 200;

                return Ok(responseData);
            }
            catch (Exception ex)
            {
                responseData.success = false;
                responseData.message = ex.Message != null ? ex.Message.ToString() : "server error";
                return Ok(responseData);
            }
        } 
    }
}