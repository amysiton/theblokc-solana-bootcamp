// fn main() {
//     // let re = Regex::new(r"[a-z&&[^aeiou]]").unwrap();
//     let consonant_regex = /[bcdfghjklmnpqrstvwxyz]/i;
//     let hay = "bootcamp";
//     let counter = hay.match(consonant_regex);

    
//     println!("{}", counter)
// }

fn main() {
    // input: any string
    // output: number of consonants

    let characters = "bootcamp";
    let mut y = 0;
    // let consonants = /[(?![aeiou])[a-z]]/gi;
    for (_index, value) in characters.chars().enumerate() { if !['a','e','i','o','u'].contains(&value) { y = y + 1; } }
    println!("consonants: {}", y);
}

// fn main() {
//     let mut count = 0;
//     for pair in vec!['a', 'b', 'c'].into_iter()
//         .map(|single_letter| { count += 1; (single_letter, count) })
//                                    {
//         println!("{:?}", pair);
                                   
//     }
// }
