using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace WebAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ManufacturerController : ControllerBase
    {

        MyDbContext dbcontext = new MyDbContext();
        private Response responseData = new Response();

        [HttpPost]
        [Route("GetAllManufacturer")]
        public async Task<IActionResult> GetAllManufacturer(Manufacturer manufacturer)
        {
            responseData = new Response();
            try
            {
                if (manufacturer.Id > 0)
                {
                    return Ok(dbcontext.Manufacturer.Where(x => x.Id == manufacturer.Id).FirstOrDefault());
                }
                else
                {
                    return Ok(dbcontext.Manufacturer.ToList());

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
        [Route("SaveManufacturer")]
        public async Task<IActionResult> SaveManufacturer(Manufacturer manufacturer)
        {
            try
            {
                
                responseData = new Response();

                if (manufacturer.Id > 0)
                {
                    var checkManufacturer = dbcontext.Manufacturer.Where(x => x.Id != manufacturer.Id && x.ManufacturerName.ToLower() == manufacturer.ManufacturerName.ToLower()).ToList();

                    if (checkManufacturer != null && checkManufacturer.Count > 0)
                    {
                        responseData.success = false;
                        responseData.message = "Manufacturer Name is already exist!";
                        responseData.code = 500;
                        return Ok(responseData);
                    }

                    var getManufacturer = dbcontext.Manufacturer.Where(x => x.Id == manufacturer.Id).FirstOrDefault();

                    if (getManufacturer != null)
                    {

                        getManufacturer.ManufacturerName = manufacturer.ManufacturerName;
                        getManufacturer.Country = manufacturer.Country;
                        dbcontext.SaveChanges();
                    }
                }
                else
                {
                    var checkManufacturerName = dbcontext.Manufacturer.Where(x => x.ManufacturerName.ToLower() == manufacturer.ManufacturerName.ToLower()).ToList();

                    if (checkManufacturerName != null && checkManufacturerName.Count > 0)
                    {
                        responseData.success = false;
                        responseData.message = "Manufacturer Name is already exist!";
                        responseData.code = 500;
                        return Ok(responseData);
                    }


                    Manufacturer tblManufacturer = new Manufacturer();
                    tblManufacturer.ManufacturerName = manufacturer.ManufacturerName;
                    tblManufacturer.Country = manufacturer.Country;
                    dbcontext.Manufacturer.Add(tblManufacturer);
                    dbcontext.SaveChanges();
                }

                responseData.success = true;
                responseData.message = "Manufacturer Saved Successfully";
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
        [Route("DeleteManufacturer")]
        public async Task<IActionResult> DeleteManufacturer(Manufacturer manufacturer)
        {
            responseData = new Response();
            try
            {
                if (manufacturer.Id > 0)
                {
                  
                    responseData = new Response();
                    var itemToRemove = dbcontext.Manufacturer.SingleOrDefault(x => x.Id == manufacturer.Id);

                    if (itemToRemove != null)
                    {
                        dbcontext.Manufacturer.Remove(itemToRemove);
                        dbcontext.SaveChanges();
                    }

                }

                responseData.success = true;
                responseData.message = "Manufacturer remove successfully";
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