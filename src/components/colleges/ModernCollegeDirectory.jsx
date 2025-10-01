import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search, MapPin, Star, Users, Heart, IndianRupee, GraduationCap, Award, Loader2, SlidersHorizontal, X
} from 'lucide-react';
import { collegesAPI, bookmarksAPI } from '../../services/api';
import { toast } from 'sonner';
import debounce from 'lodash.debounce';

const ModernCollegeDirectory = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ state: '', type: '', course: '', rating: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedColleges, setBookmarkedColleges] = useState(new Set());
  const [totalResults, setTotalResults] = useState(0);

  const mockColleges = [
    { _id: '1', name: 'Indian Institute of Technology Delhi', location: 'New Delhi, Delhi', type: 'Government', rating: 4.8, studentsCount: 8000, averageFee: 200000, image: 'https://s3.ap-southeast-1.amazonaws.com/images.deccanchronicle.com/dc-Cover-4vkidj5i781nec03lquou0o4t4-20230716003213.Medi.jpeg' },
    { _id: '2', name: 'University of Delhi', location: 'Delhi, Delhi', type: 'Government', rating: 4.5, studentsCount: 50000, averageFee: 50000, image: 'https://akm-img-a-in.tosshub.com/sites/resources/campus/prod/img/newslisting/2024/6/delhiuniversity1640037951502.avif' },
    { _id: '3', name: 'Birla Institue Of Technology', location: 'Pilani, Rajasthan', type: 'Private', rating: 4.6, studentsCount: 10000, averageFee: 300000, image: 'https://www.catalyser.in/public/img/blog/bitcblog1.jpg' },
    { _id: '4', name: 'Vellore Institute of Technology', location: 'Vellore, Tamil Nadu', type: 'Private', rating: 4.4, studentsCount: 20000, averageFee: 250000, image: 'https://img.buzzfeed.com/buzzfeed-static/static/2018-01/17/7/enhanced/buzzfeed-prod-web-10/original-6813-1516191965-2.jpg?crop=672:336;57,112&downsize=1250:*' },
    { _id: '5', name: 'Jawaharlal Nehru University', location: 'New Delhi, Delhi', type: 'Government', rating: 4.3, studentsCount: 15000, averageFee: 60000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsn4pvVTXt6EtwaPhdIuJVtiEm-sm5sHIraA&s' },
    { _id: '6', name: 'Manipal Institute of Technology', location: 'Manipal, Karnataka', type: 'Private', rating: 4.2, studentsCount: 12000, averageFee: 180000, image: 'https://www.manipal.edu/content/dam/manipal/mu/maheblr/mit/001.jpg' },
    { _id: '7', name: 'Indian Institute of Science Bangalore', location: 'Bangalore, Karnataka', type: 'Government', rating: 4.9, studentsCount: 5000, averageFee: 220000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiEruxbXKNm6CiV-4pZryr7230BbDbn-THjA&s' },
    { _id: '8', name: 'Symbiosis International University', location: 'Pune, Maharashtra', type: 'Private', rating: 4.1, studentsCount: 25000, averageFee: 200000, image: 'https://shikshahub.com/uploads/sliders/1580815569phpnXbPpu.png' }
  ];

  const fetchColleges = async (search = searchTerm, appliedFilters = filters) => {
  try {
    setLoading(true);
    const params = { search, ...appliedFilters, limit: 50 };
    Object.keys(params).forEach(key => !params[key] && delete params[key]);

    const response = await collegesAPI.getAll(params);

    setColleges(response.data.data || response.data.colleges || mockColleges);
    setTotalResults(response.data.total || response.data.data?.length || mockColleges.length);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    // Remove toast.error
    setColleges(mockColleges);
    setTotalResults(mockColleges.length);
  } finally {
    setLoading(false);
  }
};


  const debouncedFetch = useRef(debounce((value) => fetchColleges(value, filters), 400)).current;

  useEffect(() => {
    fetchColleges();
    const token = localStorage.getItem('token');
    if (token) fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await bookmarksAPI.getAll();
      const collegeBookmarks = response.data.bookmarks
        ?.filter(b => b.type === 'college')
        ?.map(b => b.itemId) || [];
      setBookmarkedColleges(new Set(collegeBookmarks));
    } catch {
      setBookmarkedColleges(new Set());
    }
  };

  const handleBookmark = async (id) => {
    try {
      await bookmarksAPI.toggle('college', id);
      setBookmarkedColleges(prev => {
        const newSet = new Set(prev);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        return newSet;
      });
    } catch {
      toast.error('Failed to update bookmark');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedFetch(e.target.value);
  };

  const clearFilters = () => {
    setFilters({ state: '', type: '', course: '', rating: '' });
    setSearchTerm('');
    fetchColleges();
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length + (searchTerm ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">College Directory</h1>
          <p className="text-lg text-gray-600 mb-6">Discover and compare top colleges across India</p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center"><GraduationCap className="h-5 w-5 mr-2 text-green-600" />100+ Programs</div>
            <div className="flex items-center"><Award className="h-5 w-5 mr-2 text-purple-600" />Verified Reviews</div>
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-7">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search colleges..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 h-12">
                <SlidersHorizontal className="h-4 w-4" /> Filters
                {activeFiltersCount > 0 && <Badge className="bg-blue-600 text-white ml-1">{activeFiltersCount}</Badge>}
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* State Filter */}
                <Select 
                  value={filters.state || "all"} 
                  onValueChange={(v) => { 
                    setFilters(prev => ({ ...prev, state: v === "all" ? "" : v })); 
                    debouncedFetch(searchTerm); 
                  }}
                >
                  <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  </SelectContent>
                </Select>

                {/* College Type Filter */}
                <Select 
                  value={filters.type || "all"} 
                  onValueChange={(v) => { 
                    setFilters(prev => ({ ...prev, type: v === "all" ? "" : v })); 
                    debouncedFetch(searchTerm); 
                  }}
                >
                  <SelectTrigger><SelectValue placeholder="College Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="deemed">Deemed University</SelectItem>
                  </SelectContent>
                </Select>

                {/* Course Filter */}
                <Select 
                  value={filters.course || "all"} 
                  onValueChange={(v) => { 
                    setFilters(prev => ({ ...prev, course: v === "all" ? "" : v })); 
                    debouncedFetch(searchTerm); 
                  }}
                >
                  <SelectTrigger><SelectValue placeholder="Course Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="arts">Arts & Humanities</SelectItem>
                  </SelectContent>
                </Select>

                {/* Rating Filter */}
                <Select 
                  value={filters.rating || "all"} 
                  onValueChange={(v) => { 
                    setFilters(prev => ({ ...prev, rating: v === "all" ? "" : v })); 
                    debouncedFetch(searchTerm); 
                  }}
                >
                  <SelectTrigger><SelectValue placeholder="Rating" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Rating</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="2">2+ Stars</SelectItem>
                  </SelectContent>
                </Select>

                {/* Clear Filters */}
                {activeFiltersCount > 0 && (
                  <div className="col-span-full flex justify-end mt-4">
                    <Button variant="outline" onClick={clearFilters} className="text-gray-600">
                      <X className="h-4 w-4 mr-2" /> Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Colleges Grid */}
        {loading ? (
          <div className="min-h-[200px] flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mr-3" /> Loading colleges...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map(college => (
              <Card key={college._id} className="border-0 shadow-md hover:shadow-xl transition-all overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden">
                  <img src={college.image} alt={college.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="sm" onClick={() => handleBookmark(college._id)} className="bg-white/90 hover:bg-white">
                      <Heart className={`h-4 w-4 ${bookmarkedColleges.has(college._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-gray-900">{college.type}</Badge>
                  </div>
                </div>

                <CardHeader className="pb-4 flex justify-between items-start">
                  <CardTitle className="text-lg leading-tight line-clamp-2">{college.name}</CardTitle>
                  <div className="flex items-center ml-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{college.rating}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 text-sm text-gray-600 space-y-2">
                  <div className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-gray-400" />{college.location}</div>
                  <div className="flex items-center"><Users className="h-4 w-4 mr-2 text-gray-400" />{college.studentsCount} students</div>
                  <div className="flex items-center"><IndianRupee className="h-4 w-4 mr-2 text-gray-400" />₹{college.averageFee.toLocaleString()} per year</div>
                  <div className="flex gap-2 mt-2">
                    {/* <Link to={`/colleges/${college._id}`} className="flex-1"> */}
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-3">
                        View Details
                      </Button>
                    {/* </Link> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernCollegeDirectory;
