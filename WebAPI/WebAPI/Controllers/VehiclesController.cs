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
    public class VehiclesController : ControllerBase
    {

        MyDbContext dbcontext = new MyDbContext();
        private Response responseData = new Response();

        [HttpPost]
        [Route("GetAllVehicles")]
        public async Task<IActionResult> GetAllVehicles(Vehicles vehicles)
        {
            responseData = new Response();
            try
            {
                if (vehicles.Id > 0)
                {
                    var getVehicles = dbcontext.Vehicles
                                      .Where(x => x.Id == vehicles.Id)
                                      .FirstOrDefault();

                    getVehicles.VehicleStatusList = dbcontext.VehicleStatus.ToList();
                    getVehicles.ModelList = dbcontext.Model.ToList();

                    return Ok(getVehicles);
                }
                else
                {
                    var getVehicles = dbcontext.Vehicles.Include(x => x.Status).Include(x=>x.Model).ToList();

                    return Ok(getVehicles);

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
        [Route("SaveVehicles")]
        public async Task<IActionResult> SaveVehicles(Vehicles vehicles)
        {
            try
            {
                
                responseData = new Response();

                if (vehicles.Id > 0)
                {
                    
                    var getvehicles = dbcontext.Vehicles.Where(x => x.Id == vehicles.Id).FirstOrDefault();

                    if (getvehicles != null)
                    {

                        getvehicles.StatusId = vehicles.StatusId;
                        getvehicles.ModelId = vehicles.ModelId;
                        getvehicles.Year = vehicles.Year;
                        getvehicles.Colour = vehicles.Colour;
                        dbcontext.SaveChanges();
                    }
                }
                else
                {

                    Vehicles tblVehicles = new Vehicles();
                    tblVehicles.StatusId = vehicles.StatusId;
                    tblVehicles.ModelId = vehicles.ModelId;
                    tblVehicles.Year = vehicles.Year;
                    tblVehicles.Colour = vehicles.Colour;
                    dbcontext.Vehicles.Add(tblVehicles);
                    dbcontext.SaveChanges();
                }

                responseData.success = true;
                responseData.message = "Vehicles Saved Successfully";
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
        [Route("DeleteVehicles")]
        public async Task<IActionResult> DeleteVehicles(Vehicles vehicles)
        {
            responseData = new Response();
            try
            {
                if (vehicles.Id > 0)
                {
                  
                    responseData = new Response();
                    var itemToRemove = dbcontext.Vehicles.SingleOrDefault(x => x.Id == vehicles.Id);

                    if (itemToRemove != null)
                    {
                        dbcontext.Vehicles.Remove(itemToRemove);
                        dbcontext.SaveChanges();
                    }

                }

                responseData.success = true;
                responseData.message = "Vehicles remove successfully";
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
        [Route("GetAllVehiclesStatus")]
        public async Task<IActionResult> GetAllVehiclesStatus(VehicleStatus vehicleStatus)
        {
            responseData = new Response();
            try
            {
                    var getVehiclesStatus = dbcontext.VehicleStatus.ToList();

                    return Ok(getVehiclesStatus);
                
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