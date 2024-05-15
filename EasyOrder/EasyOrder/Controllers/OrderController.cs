using EasyOrder.Data.Services;
using EasyOrder.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace EasyOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderServices;
        public OrderController(OrderService orderService)
        {
            _orderServices = orderService;
        }

        [HttpGet("get_orders")]
        public IActionResult GetOrders()
        {
            var orders = _orderServices.GetAllOrders();
            return Ok(orders);
        }


        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
        {
            var order = _orderServices.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]
        public IActionResult CreateOrder(Order order)
        {
            _orderServices.AddOrder(order);
            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, order);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            try
            {
                _orderServices.UpdateOrder(order);
            }
            catch (Exception)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            var order = _orderServices.GetOrderById(id);
            if (order == null)
            {
                return NotFound();
            }

            _orderServices.DeleteOrder(id);
            return NoContent();
        }
    }
}
