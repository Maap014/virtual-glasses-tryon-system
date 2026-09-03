import unittest
from app import app


class VirtualGlassesAPITest(unittest.TestCase):
      # set up test client
    def setUp(self):
        app.testing = True  # initialise testing mode
        self.client = app.test_client()  #  #initialise test client

    def test_get_all_glasses(self):
        # Request all glasses from the API
        response = self.client.get("/vto/all_glasses")

        self.assertEqual(response.status_code, 200)

        data = response.get_json()

        # Check that the API returns a successful, non-empty list
        self.assertTrue(data["success"])
        self.assertIn("data", data)
        self.assertIsInstance(data["data"], list)
        self.assertGreater(len(data["data"]), 0)

    def test_filter_glasses_by_category(self):
        # Request only sunglasses from the catalogue
        response = self.client.get("/vto/all_glasses?category=sunglasses")

        self.assertEqual(response.status_code, 200)

        data = response.get_json()

        self.assertTrue(data["success"])
        self.assertIn("data", data)

        glasses = data["data"]

        self.assertGreater(len(glasses), 0)

        # Confirm every returned product belongs to the requested category
        for glass in glasses:
            self.assertEqual(glass["category"].lower(), "sunglasses")
                
    def test_product_image_paths(self):
        # Request the full eyewear catalogue from the Flask API.
        response = self.client.get("/vto/all_glasses")

        # The endpoint should respond successfully.
        self.assertEqual(response.status_code, 200)

        data = response.get_json()
        glasses = data["data"]

        # The catalogue should contain at least one product.
        self.assertGreater(len(glasses), 0)

        for glass in glasses:
            # Each product must contain both catalogue and virtual try-on image paths.
            self.assertIn("image_url", glass)
            self.assertIn("tryon_url", glass)

            # Image paths must not be empty.
            self.assertTrue(glass["image_url"])
            self.assertTrue(glass["tryon_url"])

            # Catalogue images should point to the display-image directory.
            self.assertIn("/eyewears/display/", glass["image_url"])

            # Virtual try-on images should point to the try-on-image directory.
            self.assertIn("/eyewears/tryon/", glass["tryon_url"])


if __name__ == "__main__":
    unittest.main(verbosity=2)