package com.bogaiciuc.e_commerce;
import com.bogaiciuc.e_commerce.model.User;
import com.bogaiciuc.e_commerce.model.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
public class Controller  {

    private UserRepository userRepository;

    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody String addNewUser (@RequestParam String firstname,
                                            @RequestParam String lastName,
                                            @RequestParam String addressStreet,
                                            @RequestParam String addressZipCode,
                                            @RequestParam String addressCity,
                                            @RequestParam String addressCountry,
                                            @RequestParam String imageUrl,
                                            @RequestParam String email,
                                            @RequestParam LocalDateTime lastseen
                                            ) {


        User n = new User();
        n.setFirstName(firstname);
        n.setLastName(lastName);
        n.setEmail(email);
        n.setAddressStreet(addressStreet);
        n.setAddressZipCode(addressZipCode);
        n.setAddressCity(addressCity);
        n.setAddressCountry(addressCountry);
        n.setAddressCountry(imageUrl);
        n.setLastSeen(lastseen);
        userRepository.save(n);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }
}
